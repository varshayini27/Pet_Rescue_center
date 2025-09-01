using petProfile.Model.Entities;

namespace petProfile.Interfaces
{
    public interface IRescueCenterRepository
    {
        Task<RescueCenter> AddAsync(RescueCenter center);
        Task<List<RescueCenter>> GetAllAsync();
        Task<RescueCenter?> GetByIdAsync(Guid id);
        Task<RescueCenter> UpdateAsync(RescueCenter center);
        Task DeleteAsync(RescueCenter center);
        Task<RescueCenter?> GetByEmailAsync(string email);

    }
}
