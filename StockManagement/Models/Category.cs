using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace StockManagement.Models
{
    public class Category
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }

        public Category() { }

        public Category(string name)
        {
            if (string.IsNullOrEmpty(name))
                throw new ArgumentException("name must be set");

            this.Name = name;
        }
    }
}