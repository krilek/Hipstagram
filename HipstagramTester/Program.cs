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
                IPhotoService photoService = new PhotoService(new HostingEnvironment(),db, Mapper.Instance);
                var x = photoService.GetUserPhotos(new User { Id = 1 }).ToList();

                IGalleryService galleryService = new GalleryService(db, photoService);

                //var gallery = new Gallery { Name = "XD2" };
                var user = new User { Id = 1 };
                //gallery.Owners = new List<UserGalleries> { new UserGalleries { User = user, Gallery = gallery } };
                //galleryService.AddGallery(user, gallery);
                var galleries = galleryService.GetUserAll(user);
                galleryService.AddPhotos(Mapper.Map<GalleryDto>(galleries.FirstOrDefault()),new PhotoDto{Id = 1} );
                //photoService.GetFromGallery()
                //////gallery.Photos = new List<GalleryPhotos> {new GalleryPhotos{Gallery = gallery, Photo = userPhotos.First()}};
                ////galleryService.AddGallery(gallery);
                //galleryService.AddPhotos(Mapper.Map<GalleryDto>(new Gallery{Id = 5}), new PhotoDto{Id = 1});
                //var photos = photoService.GetFromGallery(new Gallery { Id = 5 });
                //foreach (Photo photo in photos)
                //{
                //    Console.Write(photo.Title + " " + photo.Description);
                //}
                Console.Write("End");
            }
        }
    }
}