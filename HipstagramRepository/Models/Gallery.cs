namespace HipstagramRepository.Models
{
    using System.Collections.Generic;

    using HipstagramRepository.Models.JoinEntities;

    public class Gallery
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<UserGalleries> Owners { get; set; } = new List<UserGalleries>();

        public ICollection<GalleryPhotos> Photos { get; set; } = new List<GalleryPhotos>();
    }
}