using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagmentAPI;
using StockManagmentAPI.Data;

namespace StockManagmentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public StockItemsController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockItem>>> GetStockItems()
        {
          if (_context.StockItems == null)
          {
              return NotFound();
          }
            return await _context.StockItems.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<StockItem>> GetStockItem(int id)
        {
          if (_context.StockItems == null)
          {
              return NotFound();
          }
            var stockItem = await _context.StockItems.FindAsync(id);

            if (stockItem == null)
            {
                return NotFound();
            }

            return stockItem;
        }

 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockItem(int id, StockItem stockItem)
        {
            if (id != stockItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(stockItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<StockItem>> PostStockItem(StockItem stockItem)
        {
          if (_context.StockItems == null)
          {
              return Problem("Entity set 'DataContext.StockItems'  is null.");
          }
            _context.StockItems.Add(stockItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStockItem", new { id = stockItem.Id }, stockItem);
        }

      
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockItem(int id)
        {
            if (_context.StockItems == null)
            {
                return NotFound();
            }
            var stockItem = await _context.StockItems.FindAsync(id);
            if (stockItem == null)
            {
                return NotFound();
            }


            _context.StockItems.Remove(stockItem);
            await _context.SaveChangesAsync();


            ImagesController imagesController = new ImagesController(_context);
            imagesController.DeleteImages(id);


            return NoContent();
        }

        private bool StockItemExists(int id)
        {
            return (_context.StockItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
