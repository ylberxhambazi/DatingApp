using System;

namespace ChatrDate.Models
{
    public class Visitors
    {
        public int VisitorId { get; set; }
        public int UserId { get; set; }
        public int VisitoredUserId { get; set; }
        public DateTime VisitTime { get; set; }
        public virtual User VisitedUser { get; set; }
        public virtual User VisitorUser { get; set; }
    }
}