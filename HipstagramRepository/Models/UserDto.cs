﻿using System;
using System.Collections.Generic;
using System.Text;

namespace HipstagramRepository.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
