namespace HipstagramRepository.Models.JoinEntities
{
    public class UserPhotos
    {
        public Photo Photo { get; set; }

        public int PhotoId { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }
    }
}