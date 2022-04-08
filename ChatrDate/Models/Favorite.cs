namespace ChatrDate.Models
{
    public class Favorites
    {
        public int FavoriteId { get; set; }
        public int UserId { get; set; }
        public bool FavoriteActive { get; set; }
        public virtual User Active { get; set; }
        public virtual User Deactive { get; set; }
    }
}