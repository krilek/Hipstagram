namespace HipstagramServices
{
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

        public GalleryService(HipstagramContext context)
        {
            this._context = context;
        }

        public void AddGallery(Gallery gallery)
        {
            this._context.Galleries.Add(gallery);
            this._context.SaveChanges();
        }

        public void AddPhotos(GalleryDto galleryDto, params Photo[] photos)
        {
            Gallery gallery = this.Get(galleryDto.Id);
            foreach (var photo in photos)
            {
                gallery.Photos.Add(new GalleryPhotos { Gallery = gallery, Photo = photo });
            }

            this._context.Entry(gallery).State = EntityState.Modified;

            try
            {
                this._context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // TODO: Add something
            }
        }

        public Gallery Get(int id)
        {
            return this._context.Galleries.FirstOrDefault(x => x.Id == id);
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