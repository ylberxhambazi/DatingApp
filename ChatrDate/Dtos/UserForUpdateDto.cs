using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Dtos
{
    public class UserForUpdateDto
    {
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string SeekGender { get; set; }
        public string SexualOrientation { get; set; }
        public int? AgeFrom { get; set; }
        public int? AgeTo { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string MartialStatus { get; set; }
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
    }
}
