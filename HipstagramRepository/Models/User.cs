namespace HipstagramRepository.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using HipstagramRepository.Models.JoinEntities;

    public class User
    {
        public string Email { get; set; }

        [Key]
        public int Id { get; set; }

        public bool isAdmin { get; set; }

        public string Login { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public ICollection<UserPhotos> UserPhotos { get; } = new List<UserPhotos>();
    }
}