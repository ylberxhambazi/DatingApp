﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Models
{
    public class Like
    {
        public int LikerId { get; set; }
        public int LikeeId { get; set; }
        public bool IsActive { get; set; }
        public DateTime LikedAt { get; set; }
        public virtual User Liker { get; set; }
        public virtual User Likee { get; set; }
    }
}
