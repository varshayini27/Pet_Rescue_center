using petProfile.Model.Entities;

namespace petProfile.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User user);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByEmailAndRoleAsync(string email,string role);


    }
}
