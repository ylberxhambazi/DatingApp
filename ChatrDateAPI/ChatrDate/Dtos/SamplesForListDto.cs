using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Dtos
{
    public class SamplesForListDto
    {
        public int MemberId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string SeekGender { get; set; }
        public string SexualOrientation { get; set; }
        public int Age { get; set; }
        public int? AgeFrom { get; set; }
        public int? AgeTo { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string PhotoUrl { get; set; }
    }
}
