using petProfile.Model.DTOs;
using petProfile.Model.Entities;

namespace petProfile.Interfaces
{
    public interface IRescueCenterRepository
    {
        Task<RescueCenter> AddAsync(RescueCenter center);
        Task<List<RescueCenterResponse>> GetAllAsync();
        Task<RescueCenterResponse?> GetByIdAsync(Guid id);
        //Task<RescueCenterResponse> UpdateAsync(RescueCenter center);
        Task DeleteAsync(RescueCenter center);
        Task <RescueCenter>GetEntityByIdAsync(Guid id);

        Task<RescueCenter?> GetByEmailAsync(string email);

    }
}
