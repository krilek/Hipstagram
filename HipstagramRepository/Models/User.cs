using System.ComponentModel.DataAnnotations;

namespace HipstagramRepository.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool isAdmin { get; set; }
    }

}