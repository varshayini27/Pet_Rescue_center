using Microsoft.AspNetCore.Mvc;
using petProfile.Interfaces;
using petProfile.Model.DTOs;
using petProfile.Model.Entities;
using petProfile.Services;
using petProfile.common;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity.Data;
using petProfile.Repositories;

namespace petProfile.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRescueCenterRepository _centerRepository;
        private readonly TokenService _tokenService;

        public AuthController(IUserRepository userRepository, IRescueCenterRepository centerRepository, TokenService tokenService)
        {
            _userRepository = userRepository;
            _centerRepository = centerRepository;
            _tokenService = tokenService;
        }

        [HttpPost("register/adopter")]
        public async Task<IActionResult> RegisterAdopter(RegisterAdopterRequest request)
        {
            if (await _userRepository.GetByEmailAsync(request.email) != null)
                return BadRequest(new ApiResponse<string>(null, "Email already exists", 400));

            var user = new User
            {
                user_id = Guid.NewGuid(),
                email = request.email,
                password_hash = HashPassword(request.password),
                role = "Adopter"
            };

            await _userRepository.AddAsync(user);
            var token = _tokenService.GenerateToken(user);

            return Ok(new ApiResponse<AuthResponse>(new AuthResponse { token = token, role = user.role, email = user.email }, "Adopter registered successfully", 200));
        }

        [HttpPost("register/rescuecenter")]
        public async Task<IActionResult> RegisterRescueCenter(RegisterRescueCenterRequest request)
        {
            if (await _userRepository.GetByEmailAsync(request.email) != null)
                return BadRequest(new ApiResponse<string>(null, "Email already exists", 400));

            var user = new User
            {
                user_id = Guid.NewGuid(),
                email = request.email,
                password_hash = HashPassword(request.password),
                role = "RescueCenter"
            };

            await _userRepository.AddAsync(user);

            var center = new RescueCenter
            {
                center_id = Guid.NewGuid(),
                name = request.name,
                email = request.email,
                phone_no = request.email,
                address = request.address,
                city = request.city,
                district = request.district,
                province = request.province,
                latitude = request.latitude,
                longitude = request.longitude,

            };

            await _centerRepository.AddAsync(center);

            var token = _tokenService.GenerateToken(user);

            return Ok(new ApiResponse<AuthResponse>(new AuthResponse { token = token, role = user.role, email = user.email }, "Rescue Center registered successfully", 200));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var user = await _userRepository.GetByEmailAndRoleAsync(request.email, request.role);

            if (user == null || !VerifyPassword(request.password, user.password_hash))
                return Unauthorized(new ApiResponse<string>(null, "Invalid credentials", 401));

            var token = _tokenService.GenerateToken(user);

            if (user.role == "RescueCenter")
            {
                var rescueCenter = await _centerRepository.GetByEmailAsync(user.email);
                if (rescueCenter == null)
                {
                    return NotFound(new ApiResponse<string>(null, "Rescue center not found", 404));
                }

                return Ok(new ApiResponse<AuthResponse>(
                    new AuthResponse
                    {
                        token = token,
                        role = user.role,
                        email = user.email,
                        rescueCenter = new RescueCenterResponse
                        {
                            center_id = rescueCenter.center_id,
                            name = rescueCenter.name,
                            email = rescueCenter.email,
                            phone_no = rescueCenter.email,
                            address = rescueCenter.address,
                            city = rescueCenter.city,
                            district = rescueCenter.district,
                            province = rescueCenter.province,
                            latitude = rescueCenter.latitude,
                            longitude = rescueCenter.longitude,
                        }
                    },
                    "Login successful",
                    200
                ));
            }

            // Default response for other roles
            return Ok(new ApiResponse<AuthResponse>(
                new AuthResponse
                {
                    token = token,
                    role = user.role,
                    email = user.email
                },
                "Login successful",
                200
            ));
        }



        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            return Convert.ToBase64String(
                sha256.ComputeHash(Encoding.UTF8.GetBytes(password))
            );
        }


        private static bool VerifyPassword(string password, string storedHash)
        {
            return HashPassword(password) == storedHash;
        }
    }
}
