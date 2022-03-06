using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("BasketItems")] //isso fará com que o nome da tabela seja esse, ao inves do nome da classe
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navegation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}