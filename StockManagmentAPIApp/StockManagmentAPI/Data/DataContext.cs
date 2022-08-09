using Microsoft.EntityFrameworkCore;

namespace StockManagmentAPI.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) {
            Database.EnsureCreated();
        }

        public DbSet<StockItem> StockItems { get; set; }
        public DbSet<Image> Images { get; set; }

    }
}
