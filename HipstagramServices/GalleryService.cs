namespace HipstagramServices
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using HipstagramRepository;
    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;
    using HipstagramRepository.Models.JoinEntities;

    using HipstagramServices.Interfaces;

    using Microsoft.EntityFrameworkCore;

    public class GalleryService : IGalleryService
    {
        private readonly HipstagramContext _context;

        private readonly IPhotoService _photoService;

        public GalleryService(HipstagramContext context, IPhotoService photoService)
        {
            this._context = context;
            this._photoService = photoService;
        }

        public void AddGallery(User owner, Gallery gallery)
        {
            gallery.Owners = new List<UserGalleries> { new UserGalleries { Gallery = gallery, User = owner } };
            this._context.Galleries.Add(gallery);

            // Add info to log
            this._context.Logs.Add(new Log { Activity = "Added new Gallery", Date = DateTime.Now, User = owner });
            this._context.SaveChanges();
        }

        public void AddPhotos(GalleryDto galleryDto, params PhotoDto[] photos)
        {
            Gallery gallery = this.Get(galleryDto.Id);
            foreach (var photo in photos)
            {
                if (gallery.Photos.Any(x => x.PhotoId == photo.Id)) continue;
                gallery.Photos.Add(new GalleryPhotos { Gallery = gallery, PhotoId = photo.Id });
            }

            this._context.SaveChanges();
        }

        public Gallery Get(int id)
        {
            return this._context.Galleries.Include(x => x.Photos).Single(x => x.Id == id);
        }

        public IEnumerable<Gallery> GetAll()
        {
            return this._context.Galleries;
        }

        public IEnumerable<Gallery> GetUserAll(User u)
        {
            return this._context.Galleries.Include(x => x.Owners).Where(x => x.Owners.Any(y => y.UserId == u.Id));
        }
    }
}