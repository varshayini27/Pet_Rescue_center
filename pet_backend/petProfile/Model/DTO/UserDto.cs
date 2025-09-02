namespace petProfile.Model.DTO
{
    public class UserDto
    {
        public Guid user_id { get; set; }
        public string full_name { get; set; }
        public string email { get; set; }
        public string phone_no { get; set; }
        public string address { get; set; }
    }
}
