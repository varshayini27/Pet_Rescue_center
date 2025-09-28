using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace petProfile.Model.Entities
{
    public class Report
    {
        [Key]
        public Guid report_id { get; set; }

        [Required]
        public string pet_type { get; set; }  

        [Required]
        public string description { get; set; } 

        [Required]
        public string urgency { get; set; } 

        [Required]
        public double latitude { get; set; } 

        [Required]
        public double longitude { get; set; } 

        public string? image_url { get; set; }
        public string status { get; set; } = "Pending";

        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public Guid? user_id { get; set; }
        [ForeignKey("UserId")] 
        public User? User { get; set; }  
        public Guid? rescue_center_id { get; set; }
        public RescueCenter? RescueCenter { get; set; }
    }
}
