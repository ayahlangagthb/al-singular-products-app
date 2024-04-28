namespace singular_products_app.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public double? SalePrice { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }
    }
}