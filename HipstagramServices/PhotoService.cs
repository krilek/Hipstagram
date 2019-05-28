namespace HipstagramServices
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;

    using AutoMapper;

    using HipstagramRepository;
    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;
    using HipstagramRepository.Models.JoinEntities;

    using HipstagramServices.Interfaces;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;

    public class PhotoService : IPhotoService
    {
        public const string UploadsDirectoryName = "uploads";

        private readonly HipstagramContext _context;

        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly IMapper _mapper;

        public PhotoService(IHostingEnvironment environment, HipstagramContext context, IMapper mapper)
        {
            this._mapper = mapper;
            this._hostingEnvironment = environment;
            this._context = context;
        }

        public async void Add(User user, PhotoDto photoDto)
        {
            var fileName = this.GeneratePhotoFileName(photoDto.File);
            this.SaveUploadedPhoto(fileName, photoDto.File);
            var relativeFilePath = Path.Combine(UploadsDirectoryName, fileName);
            var photo = this._mapper.Map<Photo>(photoDto);
            photo.Filename = relativeFilePath;
            photo.Authors = new List<UserPhotos> { new UserPhotos { Photo = photo, User = user } };
            this._context.Photos.Add(photo);
            this._context.Logs.Add(new Log { Activity = "Added new Photo", Date = DateTime.Now, User = user });
            await this._context.SaveChangesAsync();
        }

        public Photo Get(int id)
        {
            return this._context.Photos.Single(x => x.Id == id);
        }

        public IEnumerable<Photo> GetAll()
        {
            return this._context.Photos;
        }

        public IEnumerable<Photo> GetFromGallery(Gallery gallery)
        {
            return this._context.Galleries.Where(x => x.Id == gallery.Id).Include(x => x.Photos)
                .ThenInclude(x => x.Photo).FirstOrDefault()?.Photos.Select(x => x.Photo);
        }

        public IEnumerable<Photo> GetUserPhotos(User user)
        {
            return this._context.Photos.Include(x => x.Authors).Where(x => x.Authors.Any(y => y.UserId == user.Id));
        }

        private string GeneratePhotoFileName(IFormFile file)
        {
            string extension = Path.GetExtension(file.FileName);
            string fileName;
            do
            {
                fileName = Guid.NewGuid() + extension;
            }
            while (File.Exists(Path.Combine(this._hostingEnvironment.WebRootPath, UploadsDirectoryName, fileName)));

            return fileName;
        }

        private async void SaveUploadedPhoto(string fileName, IFormFile file)
        {
            string localPath = Path.Combine(this._hostingEnvironment.WebRootPath, UploadsDirectoryName, fileName);
            using (var fileStream = new FileStream(localPath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }
    }
}