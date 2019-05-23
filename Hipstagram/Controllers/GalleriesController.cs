using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HipstagramRepository;
using HipstagramRepository.Models;
using HipstagramRepository.Models.Dto;

namespace Hipstagram.Controllers
{
    using System.Security.Claims;

    using AutoMapper;

    using HipstagramRepository.Models.JoinEntities;

    using HipstagramServices.Interfaces;

    using Microsoft.AspNetCore.Authorization;

    [Route("api/[controller]")]
    [ApiController]
    public class GalleriesController : ControllerBase
    {
        private readonly HipstagramContext _context;
        private readonly IUserService _userService;
        private IMapper _mapper;

        public GalleriesController(HipstagramContext context, IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
            _context = context;
        }

        // GET: api/Galleries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gallery>>> GetGalleries()
        {
            try
            {
                int userId = System.Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                return await _context.Galleries.Include(x => x.Owners)
                           .Where(x => x.Owners.Any(y => y.UserId == userId)).ToListAsync();
            }
            catch (FormatException e)
            {
                return BadRequest(new { message = e.InnerException });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.InnerException });
            }

        }

        // GET: api/Galleries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gallery>> GetGallery(int id)
        {
            var gallery = await _context.Galleries.FindAsync(id);

            if (gallery == null)
            {
                return NotFound();
            }

            return gallery;
        }

        // PUT: api/Galleries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGallery(int id, Gallery gallery)
        {
            if (id != gallery.Id)
            {
                return BadRequest();
            }

            _context.Entry(gallery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GalleryExists(id))
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

        // POST: api/Galleries
        [HttpPost]
        public async Task<ActionResult<Gallery>> PostGallery([FromBody]GalleryDto galleryDto)
        {
            var gallery = this._mapper.Map<Gallery>(galleryDto);

            int userId = Convert.ToInt32(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            gallery.Owners = new List<UserGalleries>
                                 {
                                    new UserGalleries
                                        {
                                            Gallery = gallery,
                                            User = this._userService.GetUser(userId)
                                        }
                                 };
            this._context.Galleries.Add(gallery);
            await this._context.SaveChangesAsync();

            return this.Ok();
        }

        // DELETE: api/Galleries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Gallery>> DeleteGallery(int id)
        {
            var gallery = await _context.Galleries.FindAsync(id);
            if (gallery == null)
            {
                return NotFound();
            }

            _context.Galleries.Remove(gallery);
            await _context.SaveChangesAsync();

            return gallery;
        }

        private bool GalleryExists(int id)
        {
            return _context.Galleries.Any(e => e.Id == id);
        }
    }
}
