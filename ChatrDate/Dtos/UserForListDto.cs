﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? LastActive { get; set; }
        public string PhotoUrl { get; set; }
        public Boolean Favorites { get; set; }
        public int Like { get; set; }
        public int Visitor { get; set; }
    }
}
