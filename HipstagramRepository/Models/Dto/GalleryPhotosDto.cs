namespace HipstagramRepository.Models.Dto
{
    using System.Collections.Generic;

    public class GalleryPhotosDto
    {
        public GalleryDto Gallery { get; set; }

        public List<PhotoDto> Photos { get; set; }
    }
}