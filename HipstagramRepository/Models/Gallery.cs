namespace HipstagramRepository.Models
{
    using System.Collections.Generic;

    using HipstagramRepository.Models.JoinEntities;

    public class Gallery
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<GalleryPhotos> Photos { get; } = new List<GalleryPhotos>();
    }
}