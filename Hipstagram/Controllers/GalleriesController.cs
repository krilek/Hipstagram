namespace Hipstagram.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using AutoMapper;

    using HipstagramRepository;
    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;
    using HipstagramRepository.Models.JoinEntities;

    using HipstagramServices.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class GalleriesController : ControllerBase
    {
        private readonly HipstagramContext _context;

        private readonly IUserService _userService;


        private readonly IMapper _mapper;

        private IGalleryService _galleryService;

        public GalleriesController(HipstagramContext context, IMapper mapper, IUserService userService, IGalleryService galleryService)
        {
            this._mapper = mapper;
            this._userService = userService;
            this._context = context;
            this._galleryService = galleryService;
        }

        // DELETE: api/Galleries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Gallery>> DeleteGallery(int id)
        {
            var gallery = await this._context.Galleries.FindAsync(id);
            if (gallery == null) return this.NotFound();

            this._context.Galleries.Remove(gallery);
            await this._context.SaveChangesAsync();

            return gallery;
        }

        // GET: api/Galleries
        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<GalleryDto>> GetGalleries()
        {
            try
            {
                var userId = Convert.ToInt32(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var user = this._userService.GetUser(userId);
                return this._galleryService.GetUserAll(user).Select(g => new GalleryDto { Id = g.Id, Name = g.Name }).ToList();
            }
            catch (FormatException e)
            {
                return this.BadRequest(new { message = e.InnerException });
            }
            catch (Exception e)
            {
                return this.BadRequest(new { message = e.InnerException });
            }
        }

        // GET: api/Galleries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gallery>> GetGallery(int id)
        {
            var gallery = await this._context.Galleries.FindAsync(id);

            if (gallery == null) return this.NotFound();

            return gallery;
        }

        // POST: api/Galleries
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Gallery>> PostGallery([FromBody] GalleryDto galleryDto)
        {
            var gallery = this._mapper.Map<Gallery>(galleryDto);

            var userId = Convert.ToInt32(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            gallery.Owners = new List<UserGalleries>
                                 {
                                     new UserGalleries { Gallery = gallery, User = this._userService.GetUser(userId) }
                                 };
            this._context.Galleries.Add(gallery);
            //Add info to log
            this._context.Logs.Add(new Log { Activity = "Added new Gallery", Date = DateTime.Now, User = this._userService.GetUser(userId) });
            await this._context.SaveChangesAsync();
            return this.Ok();
        }

        // PUT: api/Galleries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGallery(int id, Gallery gallery)
        {
            if (id != gallery.Id) return this.BadRequest();

            this._context.Entry(gallery).State = EntityState.Modified;

            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!this.GalleryExists(id)) return this.NotFound();
                throw;
            }

            return this.NoContent();
        }

        private bool GalleryExists(int id)
        {
            return this._context.Galleries.Any(e => e.Id == id);
        }
    }
}