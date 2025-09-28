using petProfile.Model.DTOs;
using petProfile.Model.Entities;

namespace petProfile.Model.DTO
{
    public class PetDto
    {
        public Guid pet_id { get; set; }
        public string name { get; set; }
        public string species { get; set; } // Dog, Cat, etc.
        public string breed { get; set; }
        public string age { get; set; }
        public string gender { get; set; }
        public string size { get; set; }
        public string weight { get; set; }
        public string energy_level { get; set; }
        public string vaccination_status { get; set; }
        public string spayed_neutered { get; set; }
        public string good_with_children { get; set; }
        public string good_with_other_pets { get; set; }

        public string description { get; set; }
        public DateTime rescue_date { get; set; }
        public string rescue_location { get; set; }
        public string rescue_condition { get; set; }
        public string? rescued_by { get; set; }
        public string image_url { get; set; }
        public string adoption_status {  get; set; } 



        public bool is_adopted { get; set; } = false;

        public Guid rescue_center_id { get; set; }
        public RescueCenterResponse rescueCenter { get; set; }

    }

}
