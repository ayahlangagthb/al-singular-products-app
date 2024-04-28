using Microsoft.AspNetCore.Mvc;
using singular_products_app.Server.Models;
using singular_products_app.Server.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace singular_products_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSalesController : ControllerBase
    {
        private readonly ProductSalesService _productSalesService;

        public ProductSalesController(ProductSalesService productSalesService)
        {
            _productSalesService = productSalesService;
        }

        [HttpGet]
        [Route("GetProductSales")]
        public async Task<IActionResult> GetProductSales([FromQuery] int productId)
        {
            try
            {
                var productSales = await _productSalesService.GetProductSales(productId);
                return Ok(new { success = true, message = "Product sales fetched successfully", data = productSales });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Failed to fetch product sales", error = ex.Message });
            }
        }

        [HttpGet]
        [HttpGet("Products")]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _productSalesService.GetAllProducts();
                return Ok(new { success = true, message = "Products fetched successfully", data = products });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Failed to fetch products", error = ex.Message });
            }
        }
    }
}
