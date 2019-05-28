namespace HipstagramServices.Interfaces
{
    using System.Collections.Generic;

    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;

    public interface IGalleryService
    {
        void AddGallery(User owner, Gallery gallery);

        void AddPhotos(GalleryDto gallery, params PhotoDto[] photos);

        Gallery Get(int id);

        IEnumerable<Gallery> GetAll();

        IEnumerable<Gallery> GetUserAll(User u);
    }
}