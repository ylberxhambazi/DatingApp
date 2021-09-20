using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ChatrDate.Models
{
    public partial class Photo
    {
        [Key]
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime? DateAdded { get; set; }
        public bool IsMain { get; set; }
        public virtual User User { get; set; }
        public int? UserId { get; set; }
    }
}
