using System;

namespace ChatrDate.Models
{
    public class Favorites
    {
        public int FavoriteId { get; set; }
        public int UserId { get; set; } // The user who is favoriting someone
        public int FavoritedUserId { get; set; } // The user who is being favorited
        public bool FavoriteActive { get; set; } // Indicates whether the favorite is active
        public DateTime FavoritedAt { get; set; }

        public virtual User User { get; set; } // Navigation property to the favoriter
        public virtual User FavoritedUser { get; set; }
    }
}