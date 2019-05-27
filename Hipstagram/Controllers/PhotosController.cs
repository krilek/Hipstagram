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

    using HipstagramServices.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly HipstagramContext _context;

        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly IMapper _mapper;

        private readonly IUserService _userService;

        private IPhotoService _photoService;

        public PhotosController(
            HipstagramContext context,
            IHostingEnvironment environment,
            IUserService userService,
            IPhotoService photoService,
            IMapper mapper)
        {
            this._mapper = mapper;
            this._userService = userService;
            this._hostingEnvironment = environment;
            this._context = context;
            this._photoService = photoService;
        }

        // DELETE: api/Photos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Photo>> DeletePhoto(int id)
        {
            var photo = await this._context.Photos.FindAsync(id);
            if (photo == null) return this.NotFound();

            this._context.Photos.Remove(photo);
            await this._context.SaveChangesAsync();

            return photo;
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
        public ActionResult<IEnumerable<PhotoDto>> GetPhotos()
        {
            var userId = Convert.ToInt32(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = this._userService.GetUser(userId);
            return this._photoService.GetUserPhotos(user).Select(x => this._mapper.Map<PhotoDto>(x)).ToList();
        }

        // POST: api/Photos
        [Authorize]
        [HttpPost]
        public IActionResult Post([FromForm] PhotoDto file)
        {
            if (file?.File == null || file.File.Length <= 0)
            {
                return this.BadRequest(new { message = "File not provided." });
            }

            var userId = Convert.ToInt32(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = this._userService.GetUser(userId);
            this._photoService.Add(user, file);

            return this.Ok();
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