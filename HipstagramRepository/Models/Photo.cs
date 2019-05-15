using System.Collections.Generic;

namespace HipstagramRepository.Models
{
    // https://blog.oneunicorn.com/2017/09/25/many-to-many-relationships-in-ef-core-2-0-part-1-the-basics/
    public class Photo
    {
        public string Filename { get; set; }
        public int Id { get; set; }
        public ICollection<Gallery> Galleries { get; set; }
        public ICollection<User> Authors { get; set; }
    }
}
