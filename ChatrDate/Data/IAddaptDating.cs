using ChatrDate.Helpers;
using ChatrDate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Data
{
    public interface IAddaptDating
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id, bool isCurrentUser);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recepientId);
        Task<Visitors> GetVisitors(int userId, int recipientVisitorId);
        Task<Favorites> GetFavorites(int userId, int recipientFavoriteId);
    }
}
