using StockManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;


namespace StockManagement.Controllers
{
    public class TestController : ApiController
    {
         [Queryable(ResultLimit=200)]
        public IEnumerable<Product> Get()
        {
            var fruits = new Category("Fruits");
            var veggies = new Category("Veggies");

            var apple = new Product("apple");
            apple.Categories = new List<Category>() { fruits };

            var potato = new Product("Potatoes");
            potato.Categories = new List<Category>() { veggies };

            var banana = new Product("Banana");
            banana.Categories = new List<Category>() { fruits };

            List<Product> list = new List<Product>(){
              apple, potato, banana
            };

            return list.AsQueryable<Product>();
        }

    }
}
