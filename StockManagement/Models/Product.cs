using System;
using System.Collections.Generic;

namespace StockManagement.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Category> Categories { get; set; }

        public Product() { }

        public Product(string name)
            : this()
        {
            if (string.IsNullOrEmpty(name))
                throw new ArgumentException("name must be present");
            this.Name = name;
        }
    }
}