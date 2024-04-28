using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using singular_products_app.Server.Models;

namespace singular_products_app.Server.Services
{
    public class ProductSalesService
    {
        private readonly HttpClient _httpClient;

        public ProductSalesService(HttpClient httpClient)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            var apiUrl = "https://singularsystems-tech-assessment-sales-api2.azurewebsites.net/products";
            var response = await _httpClient.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Failed to fetch products. Status code: {response.StatusCode}");
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<IEnumerable<Product>>(responseBody, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? throw new InvalidOperationException("Failed to deserialize products.");
        }

        public async Task<IEnumerable<ProductSale>> GetProductSales(int productId)
        {
            var apiUrl = $"https://singularsystems-tech-assessment-sales-api2.azurewebsites.net/product-sales?Id={productId}";
            var response = await _httpClient.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Failed to fetch product sales. Status code: {response.StatusCode}");
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<IEnumerable<ProductSale>>(responseBody, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? throw new InvalidOperationException("Failed to deserialize product sales.");
        }
    }
}
