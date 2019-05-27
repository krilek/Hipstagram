namespace HipstagramServices.Interfaces
{
    using System.Collections.Generic;

    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;

    public interface IPhotoService
    {
        void Add(User user, PhotoDto photo);

        IEnumerable<Photo> GetAll();

        IEnumerable<Photo> GetFromGallery(Gallery gallery);

        IEnumerable<Photo> GetUserPhotos(User user);

        Photo Get(int id);
    }
}