using AutoMapper;
using HipstagramRepository.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace HipstagramRepository.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}
