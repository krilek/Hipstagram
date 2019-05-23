namespace HipstagramRepository.Models.Dto
{
    using System.Collections.Generic;

    public class GalleryDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        //public ICollection<UserDto> Owners { get; set; } = new List<UserDto>();
    }
}