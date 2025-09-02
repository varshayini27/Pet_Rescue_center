namespace petProfile.Model.DTO
{
    public class CreateDonationDto
    {
        public int DonorId { get; set; }
        public decimal Amount { get; set; }
        public int RescueCenterId { get; set; }
    }
}
