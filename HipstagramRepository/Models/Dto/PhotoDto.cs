﻿namespace HipstagramRepository.Models.Dto
{
    using Microsoft.AspNetCore.Http;

    public class PhotoDto
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public string FileName { get; set; }

        public IFormFile File { get; set; }

        public string Title { get; set; }
    }
}