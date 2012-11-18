using Newtonsoft.Json;
using StockManagement.Attributes;
using StockManagement.Models;
using StockManagement.Models.Validation;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StockManagement.Controllers
{
    [ExceptionLoggerFilter]
    public class CategoryController : ApiController
    {
        [Queryable(ResultLimit = 200)]
        public IQueryable<Category> GetAll()
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var categories = session.Query<Category>();
                return categories;
            }
        }

        // GET api/category/5
        public Category Get(string id)
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var category = session.Query<Category>().SingleOrDefault(x => x.Id == id);
                if (category == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                return category;
            }
        }

        // POST api/category
        [HttpPost]
        public HttpResponseMessage CreateCategory([FromBody]Category category)
        {
            var validationResult = new CategoryValidator(ValidateFor.Create).Validate(category);
            if (!validationResult.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = "Data is invalid",
                    Content = new StringContent(JsonConvert.SerializeObject(validationResult.Errors))
                });


            using (var session = Raven.Instance.Store.OpenSession())
            {
                session.Store(category);
                session.SaveChanges();
                var response = this.Request.CreateResponse<Category>(HttpStatusCode.Created, category);

                return response;
            }
        }

        // PUT api/category
        [HttpPut]
        public HttpStatusCode Update([FromBody]Category category)
        {
            var validationResult = new CategoryValidator(ValidateFor.Update).Validate(category);
            if (!validationResult.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = "Data is invalid",
                    Content = new StringContent(JsonConvert.SerializeObject(validationResult.Errors))
                });

            using (var session = Raven.Instance.Store.OpenSession())
            {
                var cat = session.Load<Category>(category.Id);
                if (cat == null)
                    return HttpStatusCode.NotFound;

                cat.Name = category.Name;
                session.SaveChanges();
                return HttpStatusCode.OK;
            }
        }

        // DELETE api/category/5
        public HttpStatusCode Delete(string id)
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var cat = session.Load<Category>(id);
                if (cat == null)
                    return HttpStatusCode.NotFound;

                session.Delete<Category>(cat);
                session.SaveChanges();
                return HttpStatusCode.OK;
            }

        }
    }
}
