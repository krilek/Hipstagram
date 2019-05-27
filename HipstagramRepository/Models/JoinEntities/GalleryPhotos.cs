namespace HipstagramRepository.Models.JoinEntities
{
    public class GalleryPhotos
    {
        public Gallery Gallery { get; set; }

        public int GalleryId { get; set; }

        public Photo Photo { get; set; }

        public int PhotoId { get; set; }
    }
}