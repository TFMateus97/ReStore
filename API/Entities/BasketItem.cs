using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navegation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }


    }
}