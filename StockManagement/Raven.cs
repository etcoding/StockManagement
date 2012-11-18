using Raven.Client.Document;
using Raven.Client.Indexes;
using StockManagement.Models;
using System;
using System.Linq;

namespace StockManagement
{
    public class Raven
    {
        private static readonly Lazy<Raven> instance = new Lazy<Raven>(() => { return new Raven(); });
        public static Raven Instance { get { return instance.Value; } }
        public DocumentStore Store;

        private Raven()
        {
            this.InitRaven();
        }

        private void InitRaven()
        {
            Store = new DocumentStore { ConnectionStringName = "RavenDB" };
            Store.Initialize();


            IndexCreation.CreateIndexes(this.Store.GetType().Assembly, Store);
        }

        private class Category_ByName : AbstractIndexCreationTask<Category>
        {
            public Category_ByName()
            {
                this.Map = cats => cats.Select(x => new { x.Name });
            }
        }

        private class Category_ById : AbstractIndexCreationTask<Category>
        {
            public Category_ById()
            {
                this.Map = cats => cats.Select(x => new { x.Id });
            }
        }

        private class Product_ById : AbstractIndexCreationTask<Product>
        {
            public Product_ById()
            {
                this.Map = prods => prods.Select(x => new { x.Id });
            }
        }
    }
}