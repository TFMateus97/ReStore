using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using API.Extensions;
using API.RequestHelpers;
using System.Text.Json;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> Get([FromQuery] ProductParams filter)
        {
            var query = _context.Products
                        .Sort(filter.OrderBy)
                        .Search(filter.SearchTerm)
                        .Filter(filter.Types, filter.Brands)
                        .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, filter.PageNumber, filter.PageSize);

            Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData));

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            return Ok(product);

        }
    }
}