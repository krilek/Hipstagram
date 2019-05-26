namespace HipstagramTester
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;

    using AutoMapper;

    using HipstagramRepository;
    using HipstagramRepository.Helpers;
    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;
    using HipstagramRepository.Models.JoinEntities;

    using HipstagramServices;
    using HipstagramServices.Interfaces;

    using Microsoft.AspNetCore.Hosting.Internal;

    class Program
    {

        static void Main(string[] args)
        {
            
            Mapper.Initialize(
                cfg =>
                    {
                        cfg.AddProfile<AutoMapperProfile>();
                    });
            Directory.SetCurrentDirectory("../../..");
            using (var db = new HipstagramContext())
            {
                IUserService service = new UserService(db);
                IGalleryService galleryService = new GalleryService(db);
                IPhotoService photoService = new PhotoService(new HostingEnvironment(),db, Mapper.Instance);
                User user = service.GetUser(1);
                IEnumerable<Photo> userPhotos = photoService.GetUserPhotos(user);
                //var gallery = new Gallery { Name = "XD2" };
                //gallery.Owners = new List<UserGalleries> { new UserGalleries { User = user, Gallery = gallery } };
                ////gallery.Photos = new List<GalleryPhotos> {new GalleryPhotos{Gallery = gallery, Photo = userPhotos.First()}};
                //galleryService.AddGallery(gallery);
                galleryService.AddPhotos(Mapper.Map<GalleryDto>(new Gallery{Id = 10}), userPhotos.ToArray());
                var galleries = galleryService.GetUserAll(user);
                var photos = photoService.GetFromGallery(new Gallery { Id = 10 });
                foreach (Photo photo in photos)
                {
                    Console.Write(photo.Title + " " + photo.Description);
                }
                Console.Write("End");
            }
        }
    }
}