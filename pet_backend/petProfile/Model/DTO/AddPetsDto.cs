using System;

namespace petProfile.Model.DTOs
{
    public class CreatePetRequest
    {
        public string name { get; set; }
        public string species { get; set; }
        public string breed { get; set; }
        public string age { get; set; }
        public bool gender { get; set; }
        public string size { get; set; }
        public string weight { get; set; }
        public string energy_level { get; set; }
        public bool vaccination_status { get; set; }
        public bool spayed_neutered { get; set; }
        public bool good_with_children { get; set; }
        public bool good_with_other_pets { get; set; }
        public string description { get; set; }
        public DateTime rescue_date { get; set; }
        public string rescue_location { get; set; }
        public string rescue_condition { get; set; }
    }
    public class UpdatePetRequest
    {
        public string name { get; set; }
        public string species { get; set; }
        public string breed { get; set; }
        public string age { get; set; }
        public bool gender { get; set; }
        public string size { get; set; }
        public string weight { get; set; }
        public string energy_level { get; set; }
        public bool vaccination_status { get; set; }
        public bool spayed_neutered { get; set; }
        public bool good_with_children { get; set; }
        public bool good_with_other_pets { get; set; }
        public string description { get; set; }
        public DateTime rescue_date { get; set; }
        public string rescue_location { get; set; }
        public string rescue_condition { get; set; }
        public string rescued_by { get; set; }
        public Guid rescue_center_id { get; set; }
    }

        public class PetResponse
        {
            public Guid pet_id { get; set; }
            public string name { get; set; }
            public string species { get; set; }
            public string breed { get; set; }
            public string age { get; set; }
            public bool gender { get; set; }
            public string size { get; set; }
            public string weight { get; set; }
            public string energy_level { get; set; }
            public bool vaccination_status { get; set; }
            public bool spayed_neutered { get; set; }
            public bool good_with_children { get; set; }
            public bool good_with_other_pets { get; set; }
            public string description { get; set; }
            public DateTime rescue_date { get; set; }
            public string rescue_location { get; set; }
            public string rescue_condition { get; set; }
            public string rescued_by { get; set; }
            public bool is_adopted { get; set; }

            // Rescue Center info
            public RescueCenterResponse RescueCenter { get; set; }
        }
    }
