namespace HipstagramRepository.Models
{
    using System.Collections.Generic;

    using HipstagramRepository.Models.JoinEntities;

    // https://blog.oneunicorn.com/2017/09/25/many-to-many-relationships-in-ef-core-2-0-part-1-the-basics/
    public class Photo
    {
        public ICollection<UserPhotos> Authors { get; } = new List<UserPhotos>();

        public string Filename { get; set; }

        public ICollection<GalleryPhotos> Galleries { get; } = new List<GalleryPhotos>();

        public int Id { get; set; }
    }
}