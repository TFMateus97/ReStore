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
        public async Task<ActionResult<PagedList<Product>>> Get([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                        .Sort(productParams.OrderBy)
                        .Search(productParams.SearchTerm)
                        .Filter(productParams.Types, productParams.Brands)
                        .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

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

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(b => b.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(t => t.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}