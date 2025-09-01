//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using petProfile.Database;
//using petProfile.Model.Entities;
//using System.Security.Cryptography;
//using System.Text;
//using petProfile.Model.DTO;

//namespace petProfile.Controllers
//{
//    [Route("api/users")]
//    [ApiController]
//    public class UsersController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public UsersController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
//        {
//            var users = await _context.Users
//                .Select(u => new UserDto
//                {
//                    user_id = u.user_id,
//                    full_name = u.full_name,
//                    email = u.email,
//                    phone_no = u.phone_no,
//                    address = u.address,
//                })
//                .ToListAsync();

//            return Ok(users);
//        }

//        [HttpPost]
//        public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto userDto)
//        {
//            // Hash password before storing (if required)
//            string hashedPassword = HashPassword(userDto.Password);

//            var user = new User
//            {
//                full_name = userDto.FullName,
//                email = userDto.Email,
//                password = hashedPassword, // Storing hashed password
//                phone_no = userDto.PhoneNumber,
//                address = userDto.Address,
//            };

//            _context.Users.Add(user);
//            await _context.SaveChangesAsync();

//            var createdUserDto = new UserDto
//            {
//                user_id = user.user_id,
//                full_name = user.full_name,
//                email = user.email,
//                phone_no = user.phone_no,
//                address = user.address,
//            };

//            return CreatedAtAction(nameof(GetUsers), new { id = user.user_id }, createdUserDto);
//        }

//        private string HashPassword(string password)
//        {
//            using (var sha256 = SHA256.Create())
//            {
//                var bytes = Encoding.UTF8.GetBytes(password);
//                var hash = sha256.ComputeHash(bytes);
//                return Convert.ToBase64String(hash);
//            }
//        }
//    }
//}
