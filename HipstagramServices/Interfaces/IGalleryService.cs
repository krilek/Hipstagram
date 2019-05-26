﻿namespace HipstagramServices.Interfaces
{
    using System.Collections.Generic;

    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;

    public interface IGalleryService
    {
        void AddGallery(Gallery gallery);

        void AddPhotos(GalleryDto gallery, params Photo[] photos);

        Gallery Get(int id);

        IEnumerable<Gallery> GetAll();

        IEnumerable<Gallery> GetUserAll(User u);
    }
}