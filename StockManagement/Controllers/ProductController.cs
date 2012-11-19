using Newtonsoft.Json;
using StockManagement.Attributes;
using StockManagement.Models;
using StockManagement.Models.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StockManagement.Controllers
{
    [ExceptionLoggerFilter]
    public class ProductController : ApiController
    {
        [Queryable(ResultLimit = 200)]
        public IQueryable<Product> GetAll()
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var categories = session.Query<Product>();
                return categories;
            }
        }

        // GET api/product/5
        public Product Get(string id)
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var product = session.Query<Product>().SingleOrDefault(x => x.Id == id);
                if (product == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                return product;
            }
        }

        // POST api/product
        [HttpPost]
        public HttpResponseMessage CreateProduct([FromBody]Product product)
        {
            var validationResult = new ProductValidator(ValidateFor.Create).Validate(product);
            if (!validationResult.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = "Data is invalid",
                    Content = new StringContent(JsonConvert.SerializeObject(validationResult.Errors))
                });


            using (var session = Raven.Instance.Store.OpenSession())
            {
                session.Store(product);
                session.SaveChanges();
                var response = this.Request.CreateResponse<Product>(HttpStatusCode.Created, product);

                return response;
            }
        }

        // PUT api/product
        [HttpPut]
        public HttpStatusCode Update([FromBody]Product product)
        {
            var validationResult = new ProductValidator(ValidateFor.Update).Validate(product);
            if (!validationResult.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = "Data is invalid",
                    Content = new StringContent(JsonConvert.SerializeObject(validationResult.Errors))
                });

            using (var session = Raven.Instance.Store.OpenSession())
            {
                var prod = session.Load<Product>(product.Id);
                if (prod == null)
                    return HttpStatusCode.NotFound;

                prod.Name = product.Name;
                prod.Categories = product.Categories;
                session.SaveChanges();
                return HttpStatusCode.OK;
            }
        }

        // DELETE api/product/5
        public HttpStatusCode Delete(string id)
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var prod = session.Load<Product>(id);
                if (prod == null)
                    return HttpStatusCode.NotFound;

                session.Delete<Product>(prod);
                session.SaveChanges();
                return HttpStatusCode.OK;
            }
        }
    }
}