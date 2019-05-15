using System.ComponentModel.DataAnnotations;

namespace HipstagramRepository.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool isAdmin { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
    }

}