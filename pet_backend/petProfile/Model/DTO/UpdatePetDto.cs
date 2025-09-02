namespace petProfile.Model.DTO
{
    public class UpdatePetDto
    {
        public string name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public bool Gender { get; set; }
        public string Description { get; set; }

    }
}
