using petProfile.Model.DTO;

namespace petProfile.Model.DTOs
{
    public class RegisterAdopterRequest
    {
        public string email { get; set; }
        public string password { get; set; }
    }

    public class RegisterRescueCenterRequest
    {
        public string name { get; set; } 
        public string email { get; set; }
        public string phone_no { get; set; } 
        public string address { get; set; }
        public string city { get; set; } 
        public string district { get; set; }
        public string province { get; set; }
        public string password { get; set; }


        public double latitude { get; set; }
        public double longitude { get; set; }
        public string image_url { get; set; }
        public string history { get; set; }

    }

    public class LoginRequestDto
    {
        public string email { get; set; }
        public string password { get; set; }

        public string role { get; set; }
    }
    public class RescueCenterResponse
    {
        public Guid center_id { get; set; }

        public string name { get; set; }
        public string email { get; set; }
        public string phone_no { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public string province { get; set; }
        public string password { get; set; }

        public string image_url { get; set; }
        public string history { get; set; }



        public double latitude { get; set; }
        public double longitude { get; set; }
        public ICollection<PetDto> Pets { get; set; }


    }



    public class AuthResponse
    {
        public string token { get; set; }
        public string role { get; set; }
        public string email { get; set; }
        public RescueCenterResponse? rescueCenter { get; set; }
    }
}
