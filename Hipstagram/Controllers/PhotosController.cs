namespace Hipstagram.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using AutoMapper;

    using HipstagramRepository;
    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;
    using HipstagramRepository.Models.JoinEntities;

    using HipstagramServices.Interfaces;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private const string UploadsDirectoryName = "uploads";

        private readonly HipstagramContext _context;

        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly IMapper _mapper;

        private readonly IUserService _userService;

        public PhotosController(
            HipstagramContext context,
            IHostingEnvironment environment,
            IUserService userService,
            IMapper mapper)
        {
            this._mapper = mapper;
            this._userService = userService;
            this._hostingEnvironment = environment;
            this._context = context;
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photo>>> GetPhotos()
        {
            return await this._context.Photos.ToListAsync();
        }

        // POST: api/Photos
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] PhotoDto file)
        {
            if (file == null || file.File == null || file.File.Length <= 0)
                return this.BadRequest(new { message = "File not provided." });

            var uploadsDir = Path.Combine(this._hostingEnvironment.WebRootPath, UploadsDirectoryName);
            var extension = Path.GetExtension(file.File.FileName);
            string relativeFilePath;
            string localFilePath;
            do
            {
                relativeFilePath = Path.Combine(UploadsDirectoryName, Guid.NewGuid() + extension);
                localFilePath = Path.Combine(this._hostingEnvironment.WebRootPath, relativeFilePath);
            }
            while (System.IO.File.Exists(localFilePath));
            using (var fileStream = new FileStream(localFilePath, FileMode.Create))
            {
                await file.File.CopyToAsync(fileStream);
            }

            var userId = Convert.ToInt32(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = this._userService.GetUser(userId);

            var photo = this._mapper.Map<Photo>(file);
            photo.Filename = relativeFilePath;
            photo.Authors = new List<UserPhotos> { new UserPhotos { Photo = photo, User = user } };
            this._context.Photos.Add(photo);
            this._context.Logs.Add(new Log { Activity = "Added new Photo", Date = DateTime.Now, User = user });
            await this._context.SaveChangesAsync();
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