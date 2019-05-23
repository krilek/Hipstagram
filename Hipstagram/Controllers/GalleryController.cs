namespace Hipstagram.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using HipstagramRepository;
    using HipstagramRepository.Models;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly HipstagramContext _context;


        public GalleryController(HipstagramContext context)
        {
            this._context = context;
        }

        // DELETE: api/Photos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Gallery>> DeletePhoto(int id)
        {
            var gallery = await this._context.Galleries.FindAsync(id);
            if (gallery == null) return this.NotFound();

            this._context.Galleries.Remove(gallery);

            await this._context.SaveChangesAsync();

            return gallery
;
        }

        // GET: api/Photos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Photo>> GetPhoto(int id)
        {
            var photo = await this._context.Photos.FindAsync(id);

            if (photo == null) return this.NotFound();

            return photo;
        }

        // GET: api/Photos
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photo>>> GetPhotos()
        {
            return await this._context.Photos.ToListAsync();
        }

        // POST: api/Photos
        [HttpPost]
        public async Task<IActionResult> Post(IEnumerable<IFormFile> files)
        {
            var uploads = Path.Combine(this._hostingEnvironment.WebRootPath, UploadsDirectoryName);
            foreach (var file in files)
                if (file.Length > 0)
                {
                    var filePath = Path.Combine(uploads, file.FileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }

            // TODO: add in a future returining a db entry for file.
            return this.NoContent();
        }

        // PUT: api/Photos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhoto(int id, Photo photo)
        {
            if (id != photo.Id) return this.BadRequest();

            this._context.Entry(photo).State = EntityState.Modified;

            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!this.PhotoExists(id)) return this.NotFound();
                throw;
            }

            return this.NoContent();
        }

        private bool PhotoExists(int id)
        {
            return this._context.Photos.Any(e => e.Id == id);
        }
    }
}