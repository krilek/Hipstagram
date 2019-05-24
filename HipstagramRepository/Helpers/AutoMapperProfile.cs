using AutoMapper;
using HipstagramRepository.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace HipstagramRepository.Helpers
{
    using HipstagramRepository.Models.Dto;

    using UserDto = HipstagramRepository.Models.UserDto;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<GalleryDto, Gallery>();
            CreateMap<Gallery, GalleryDto>();

        }
    }
}
