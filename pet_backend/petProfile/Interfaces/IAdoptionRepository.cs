using petProfile.Model.DTO;
using petProfile.Model.Entities;

namespace petProfile.Interfaces
{
    public interface IAdoptionRepository
    {
        Task<Adoption> AddAsync(Adoption adoption);
        Task<List<AdoptionDto>> GetAllAsync();
        Task<Adoption?> GetByIdAsync(Guid id);
        Task<Adoption> UpdateAsync(Adoption adoption);
        Task DeleteAsync(Adoption adoption);
    }
}
