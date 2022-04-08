namespace ChatrDate.Models
{
    public class Visitors
    {
        public int VisitorId { get; set; }
        public int UserId { get; set; }
        public int VisitorCount { get; set; }
        public virtual User Visitor { get; set; }
        public virtual User Visitores { get; set; }
    }
}