using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrDate.Dtos
{
    public class UserForRegisterDto
    {
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }
        public DateTime BirthDay { get; set; }
        public string Iam { get; set; }
        public string ImLooking { get; set; }
    }
}
