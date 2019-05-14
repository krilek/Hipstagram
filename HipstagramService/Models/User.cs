﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HipstagramService.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public bool isAdmin { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }

}