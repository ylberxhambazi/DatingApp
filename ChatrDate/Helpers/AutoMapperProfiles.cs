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
                })
                .ForMember(fav => fav.Favorites, opt =>
                {
                    opt.MapFrom(src => src.Actives.FirstOrDefault(f => f.FavoriteActive).FavoriteActive);
                })
                .ForMember(fav => fav.Favorites, opt =>
                {
                    opt.MapFrom(src => src.Deactives.FirstOrDefault(f => f.FavoriteActive).FavoriteActive);
                })
                .ForMember(visit => visit.Visitor, opt =>
                {
                    opt.MapFrom(src => src.Visitores.FirstOrDefault().VisitorCount);
                })
                .ForMember(like => like.Like, opt =>
                {
                    opt.MapFrom(src => src.Likers.FirstOrDefault().LikeeId);
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                }).ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForUpdateDto, User>();
        }
    }
}
