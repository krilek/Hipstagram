namespace HipstagramRepository.Helpers
{
    using AutoMapper;

    using HipstagramRepository.Models;
    using HipstagramRepository.Models.Dto;

    using UserDto = HipstagramRepository.Models.UserDto;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            this.CreateMap<User, UserDto>();
            this.CreateMap<UserDto, User>();
            this.CreateMap<GalleryDto, Gallery>();
            this.CreateMap<Gallery, GalleryDto>();
            this.CreateMap<Photo, PhotoDto>();
            this.CreateMap<PhotoDto, Photo>();
        }
    }
}