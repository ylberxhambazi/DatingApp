using ChatrDate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string SexualOrientation { get; set; }
        public string Height { get; set; }
        public string BodyType { get; set; }
        public string HaveChildren { get; set; }
        public string Smoke { get; set; }
        public string Drink { get; set; }
        public string Education { get; set; }
        public string Occupation { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
    }
}
