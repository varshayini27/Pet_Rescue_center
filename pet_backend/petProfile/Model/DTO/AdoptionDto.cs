namespace petProfile.Model.DTO
{
    public class AdoptionDto
         {
        public Guid adoption_id { get; set; }
        public Guid pet_id { get; set; }
        public string full_name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string reason { get; set; }
        public DateTime request_date { get; set; }
        public string status { get; set; }

        // Related Pet
        public PetDto? Pet { get; set; }

        // Related User (optional)
        public UserDto? User { get; set; }
}
    public class AdoptionCreateDto
    {
        public string full_name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string reason { get; set; }

        // Related Pet

    }
}
