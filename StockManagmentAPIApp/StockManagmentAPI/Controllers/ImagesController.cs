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
    public class ImagesController : ControllerBase
    {
        private readonly DataContext _context;

        public ImagesController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task images([FromForm] ImageData image)
        {

            var convertId = Convert.ToInt32(image.StockItemId);
            Image newImage = new Image();
            if (image.file.Length > 0)
            {

                newImage.Name = image.file.Name;

                using (var ms = new MemoryStream())
                {
                    image.file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    string s = Convert.ToBase64String(fileBytes);
                    newImage.ImageBytes = fileBytes;
                    newImage.StockItemId = convertId;
                    newImage.ImageType = image.ImageType;
                }

            }

            if (image.ImageType == "Primary")
            {
                var checkIfPrimaryExist = _context.Images.Where(x => x.StockItemId == convertId).Where(x => x.ImageType == "Primary").FirstOrDefault();
                if (checkIfPrimaryExist != null)
                {
                    var imagePreviousPrimary = await _context.Images.FindAsync(checkIfPrimaryExist.Id);
                    _context.Images.Remove(imagePreviousPrimary);
                    await _context.SaveChangesAsync();
                }
       
            }
            _context.Images.Add(newImage);
            await _context.SaveChangesAsync();

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Image>>> images(int id)
        {

            if (_context.StockItems == null)
            {
                return NotFound();
            }
            var images = await _context.Images.Where(x => x.StockItemId == id).ToListAsync();

            if (images == null)
            {
                return NotFound();
            }

            return images;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImages(int id)
        {
            if (_context.StockItems == null)
            {
                return NotFound();
            }
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

