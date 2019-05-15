using System;
using System.Collections.Generic;
using System.Text;

namespace HipstagramRepository.Models
{
    public class Gallery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
