using ChatrDate.Helpers;
using ChatrDate.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Data
{
    public class AddaptDating : IAddaptDating
    {
        private readonly AddaptAppDatingAPIContext _context;
        public AddaptDating(AddaptAppDatingAPIContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Like> GetLike(int userId, int recepientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recepientId);
        }
        public async Task<Visitors> GetVisitors(int userId, int recipientVisitorId)
        {
            return await _context.Visitors.FirstOrDefaultAsync(u => u.UserId == userId && u.VisitorId == recipientVisitorId);
        }

        public async Task<Favorites> GetFavorites(int userId, int recipientFavoriteId)
        {
            return await _context.Favorites.FirstOrDefaultAsync(u => u.UserId == userId && u.FavoriteId == recipientFavoriteId);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Sample> GetSample(int id)
        {
            var sample = await _context.Samples.FirstOrDefaultAsync(s => s.MemberId == id);
            return sample;
        }

        public async Task<IEnumerable<Sample>> GetSamples()
        {
            var samples = await _context.Samples.ToListAsync();
            return samples;
        }

        public async Task<User> GetUser(int id, bool isCurrentUser)
        {
            var query = _context.Users.Include(p => p.Photos).Include(f => f.Actives).Include(fd => fd.Deactives).Include(v => v.ViewVisitors).Include(l => l.Likers).AsQueryable();

            if (isCurrentUser)
                query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(p => p.Photos).Include(f => f.Actives).Include(fd => fd.Deactives).Include(v => v.Visitores).Include(l => l.Likers).OrderByDescending(u => u.LastActive).AsQueryable();
            users = users.Where(u => u.Id != userParams.UserId);
            users = users.Where(u => u.Gender == userParams.Gender);
            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }
            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }
            if (userParams.VisitorCount)
            {
                var userViews = await GetUserViews(userParams.UserId, userParams.VisitorCount);
                users = users.Where(u => userViews.Contains(u.Id));
            }
            if (userParams.FavoritsActives)
            {
                var userActiveFavorites = await GetUserFavorites(userParams.UserId, userParams.FavoritsActives);
                users = users.Where(u => userActiveFavorites.Contains(u.Id));
            }
            if (userParams.FavoritsDeactives)
            {
                var userDeactiveFavorites = await GetUserFavorites(userParams.UserId, userParams.FavoritsDeactives);
                users = users.Where(u => userDeactiveFavorites.Contains(u.Id));
            }
            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }
            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserViews(int userId, bool view)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            return _context.Visitors.Where(u => u.VisitorId == userId).Select(i => i.UserId);
        }

        private async Task<IEnumerable<int>> GetUserFavorites(int userId, bool favorites)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (favorites)
                return _context.Favorites.Where(u => u.FavoriteId == userId).Select(f => f.UserId);
            else
                return _context.Favorites.Where(u => u.FavoriteId == userId).Select(f => f.UserId);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return _context.Likes.Where(u => u.LikeeId == id).Select(i => i.LikerId);
            }
            else
            {
                return _context.Likes.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
