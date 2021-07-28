using ChatrDate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Dtos
{
    public class SamplesForDetailedDto
    {
        public int MemberId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string MaritalStatus { get; set; }
        public string LookingFor { get; set; }
        public string Occupation { get; set; }
        public string Language { get; set; }
        public string Race { get; set; }
        public string Religion { get; set; }
        public string Height { get; set; }
        public string BodyType { get; set; }
        public string EyeColor { get; set; }
        public string HairColor { get; set; }
        public string WantChildren { get; set; }
        public string HaveChildren { get; set; }
        public string Education { get; set; }
        public string Smoke { get; set; }
        public string Drink { get; set; }
        public string Interests { get; set; }
        public int? PhotoCount { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
