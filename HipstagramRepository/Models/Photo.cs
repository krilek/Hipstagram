namespace HipstagramRepository.Models
{
    using System.Collections.Generic;

    using HipstagramRepository.Models.JoinEntities;

    public class Photo
    {
        public ICollection<UserPhotos> Authors { get; set; } = new List<UserPhotos>();

        public string Details { get; set; }

        public string Filename { get; set; }

        public ICollection<GalleryPhotos> Galleries { get; set; } = new List<GalleryPhotos>();

        public int Id { get; set; }

        public string Title { get; set; }
    }
}