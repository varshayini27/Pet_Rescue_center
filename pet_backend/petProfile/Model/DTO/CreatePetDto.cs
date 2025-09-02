namespace petProfile.Model.DTO
{
    public class CreatePetDto
    {
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public string HealthStatus { get; set; }
        public int RescueCenterId { get; internal set; }
    }

}
