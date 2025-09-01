using petProfile.Database;
using petProfile.Interfaces;
using petProfile.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace petProfile.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.email == email);
        }
        public async Task<User?> GetByEmailAndRoleAsync(string email, string role)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.email == email && u.role == role);
        }

    }
}
