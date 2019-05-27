namespace HipstagramServices.Interfaces
{
    using System.Collections.Generic;

    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;

    public interface IPhotoService
    {
        void Add(User user, PhotoDto photo);

        IEnumerable<Photo> Get(User user);

        IEnumerable<Photo> GetAll();
    }
}