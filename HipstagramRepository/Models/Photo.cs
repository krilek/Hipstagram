namespace HipstagramRepository.Models
{
    public class Photo
    {
        public string Filename { get; set; }
        public int Id { get; set; }
        public ICollection<Gallery> Galleries { get; set; }
        public ICollection<User> Authors { get; set; }
    }
}
