using System.ComponentModel.DataAnnotations;

namespace StockManagmentAPI
{
    public class StockItem
    {
        public int Id { get; set; }

        public string RegNo{ get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public int ModelYear { get; set; }

        public string CurrentKMS { get; set; }

        public string Colour { get; set; }

        public int VIN { get; set; }

        public string RetailPrice { get; set; }

        public string CostlPrice { get; set; }
        
        public DateTime DTCreated { get; set; }

        public DateTime? DTUpdated { get; set; }

    }
}
