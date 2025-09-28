using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace petProfile.Model.Entities
{
    public class Donation
    {
        [Key]
        public Guid donation_id { get; set; }

        public string name { get; set; }
        public string message { get; set; }


        public decimal amount { get; set; } 

        [Required]
        public DateTime date { get; set; } = DateTime.UtcNow;

        [ForeignKey("User")]
        public Guid user_id { get; set; }
        public User User { get; set; }

        public Guid rescue_center_id { get; set; }
        public RescueCenter RescueCenter { get; set; }
    }
}
