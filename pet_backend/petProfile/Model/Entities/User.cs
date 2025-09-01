using System.ComponentModel.DataAnnotations;

namespace petProfile.Model.Entities
{
    public class User
    {
        [Key]
        public Guid user_id { get; set; }

        [Required, EmailAddress]
        public string email { get; set; }

        [Required]
        public string password_hash { get; set; }

        [Required]
        public string role { get; set; } 

        public DateTime created_at { get; set; } = DateTime.UtcNow;
        public ICollection<Donation> Donations { get; set; }
        public ICollection<Report> Reports { get; set; }
    }

}
