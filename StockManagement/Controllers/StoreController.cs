using Newtonsoft.Json;
using StockManagement.Attributes;
using StockManagement.Models;
using System;
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
            throw new NotImplementedException();
        }

        // GET api/Store/5
        public Store Get(string id)
        {
            throw new NotImplementedException();
        }

        // POST api/Store
        [HttpPost]
        public HttpResponseMessage CreateStore([FromBody]Store Store)
        {
            throw new NotImplementedException();
        }

        // PUT api/Store/5
        [HttpPut]
        public HttpStatusCode Update(string id, [FromBody]Store Store)
        {
            throw new NotImplementedException();
        }

        // DELETE api/Store/5
        public HttpStatusCode Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
