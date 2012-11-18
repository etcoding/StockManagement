using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace StockManagement.Models
{
    public class Store
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }

        private Dictionary<Product, int> productStock = new Dictionary<Product, int>();
        public IReadOnlyDictionary<Product, int> ProductStock { get { return this.productStock as IReadOnlyDictionary<Product, int>; } }

        ReaderWriterLockSlim rwlProductStock = new ReaderWriterLockSlim();

        public int IncrementProductStock(Product product, int count)
        {
            if (product == null)
                throw new ArgumentNullException("product");
            if (count <= 0)
                throw new ArgumentException("Count must be greater than zero");
            if (string.IsNullOrEmpty(product.Id))
                throw new ArgumentException("Product must have an Id");

            rwlProductStock.EnterWriteLock();
            try
            {
                if (!productStock.ContainsKey(product))
                {
                    productStock.Add(product, count);
                }
                else
                {
                    productStock[product] += count;
                }

                return productStock[product];
            }
            finally
            {
                rwlProductStock.ExitWriteLock();
            }
        }

        public int DecrementProductStock(Product product, int count)
        {
            if (product == null)
                throw new ArgumentNullException("product");
            if (count <= 0)
                throw new ArgumentException("Count must be greater than zero");

            rwlProductStock.EnterWriteLock();
            try
            {
                if (!this.productStock.ContainsKey(product))
                    throw new ArgumentException("Product " + product + " is not in stock");
                if (count > this.productStock[product])
                    throw new ArgumentException("Requested count exceeds available stock; Requested: " + count + ", available: " + this.productStock[product]);

                this.productStock[product] -= count;

                return this.productStock[product];
            }
            finally
            {
                rwlProductStock.ExitWriteLock();
            }

        }
    }
}