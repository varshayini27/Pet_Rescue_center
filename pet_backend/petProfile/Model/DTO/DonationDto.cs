namespace petProfile.Model.DTO
{
    public class DonationDto
    {
        
    public Guid user_id { get; set; }
        public Guid rescue_center_id { get; set; }
        public decimal amount { get; set; }
        public string name { get; set; }
        public string message { get; set; }
    
}
}
