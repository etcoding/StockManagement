using Newtonsoft.Json;
using StockManagement.Attributes;
using StockManagement.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StockManagement.Controllers
{
    [ExceptionLoggerFilter]
    public class StoreController : ApiController
    {
        [Queryable(ResultLimit = 200)]
        public IQueryable<Store> GetAll()
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var categories = session.Query<Store>();
                return categories;
            }
        }

        // GET api/Store/5
        public Store Get(string id)
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var Store = session.Query<Store>().SingleOrDefault(x => x.Id == id);
                if (Store == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                return Store;
            }
        }

        // POST api/Store
        [HttpPost]
        public HttpResponseMessage CreateStore([FromBody]Store Store)
        {
            if (!string.IsNullOrEmpty(Store.Id))
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "Why is id set?" });

            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = "Data is invalid",
                    Content = new StringContent(JsonConvert.SerializeObject(ModelState))
                });

            using (var session = Raven.Instance.Store.OpenSession())
            {
                session.Store(Store);
                session.SaveChanges();
                var response = this.Request.CreateResponse<Store>(HttpStatusCode.Created, Store);

                return response;
            }
        }

        // PUT api/Store/5
        [HttpPut]
        public HttpStatusCode Update(string id, [FromBody]Store Store)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = "Data is invalid",
                    Content = new StringContent(JsonConvert.SerializeObject(ModelState))
                });

            using (var session = Raven.Instance.Store.OpenSession())
            {
                var cat = session.Load<Store>(id);
                if (cat == null)
                    return HttpStatusCode.NotFound;

                cat.Name = Store.Name;
                session.SaveChanges();
                return HttpStatusCode.OK;
            }
        }

        // DELETE api/Store/5
        public HttpStatusCode Delete(int id)
        {
            using (var session = Raven.Instance.Store.OpenSession())
            {
                var cat = session.Load<Store>(id);
                if (cat == null)
                    return HttpStatusCode.NotFound;

                session.Delete<Store>(cat);
                return HttpStatusCode.OK;
            }
        }
    }
}
