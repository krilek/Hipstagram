namespace HipstagramRepository.Models.Dto
{
    using Microsoft.AspNetCore.Http;

    public class PhotoDto
    {
        public string Description { get; set; }

        public IFormFile File { get; set; }

        public string Title { get; set; }
    }
}