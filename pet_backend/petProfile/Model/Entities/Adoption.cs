using System.ComponentModel.DataAnnotations;

namespace petProfile.Model.Entities
{
    public class Adoption
    {
        [Key]
        public Guid adoption_id { get; set; }

        public Guid pet_id { get; set; }
        public Pet Pet { get; set; }

        public string full_name { get; set; }

        [EmailAddress]
        public string email { get; set; }

        public string phone { get; set; }

        public string reason { get; set; }

        public DateTime request_date { get; set; } = DateTime.UtcNow;

        // Optional: Link to User (if logged in users adopt)
        public Guid? user_id { get; set; }
        public User? User { get; set; }

        // Status of adoption request (Pending, Approved, Rejected)
        public string status { get; set; } = "Pending";
}
}
