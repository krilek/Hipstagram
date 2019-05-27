namespace HipstagramRepository.Models.JoinEntities
{
    public class UserGalleries
    {
        public Gallery Gallery { get; set; }

        public int GalleryId { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }
    }
}