namespace StockManagmentAPI
{
    public class Image
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public byte[] ImageBytes { get; set; }

        public string ImageType { get; set; }

        public int StockItemId { get; set; }

        public StockItem? StockItem { get; set; }
    }
}
