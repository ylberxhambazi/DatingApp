using AutoMapper;
using ChatrDate.Dtos;
using ChatrDate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                }).ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Sample, SamplesForListDto>()
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.Birthdate.CalculateAge());
                });
            CreateMap<Sample, SamplesForDetailedDto>()
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.Birthdate.CalculateAge());
                });
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}
