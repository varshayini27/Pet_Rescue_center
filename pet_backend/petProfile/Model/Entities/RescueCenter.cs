using System.ComponentModel.DataAnnotations;

namespace petProfile.Model.Entities
{
    public class RescueCenter
    {

        [Key]
        public Guid center_id { get; set; }

            public string name { get; set; } = string.Empty;
            public string email { get; set; } = string.Empty;
            public string phone_no { get; set; } = string.Empty;
            public string address { get; set; } = string.Empty;
            public string city { get; set; } = string.Empty;
            public string district { get; set; } = string.Empty;
            
            public string province { get; set; } = string.Empty;

            public double latitude { get; set; }
            public double longitude { get; set; }

            public DateTime registeredAt { get; set; } = DateTime.UtcNow;
        public string image_url { get; set; }
        public string? history { get; set; }


        public ICollection<Pet> Pets { get; set; }
        public ICollection<Donation> Donations { get; set; }
        public ICollection<Report> Reports { get; set; }

    }
}
