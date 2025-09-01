using petProfile.Model.Entities;

namespace petProfile.Interfaces
{
    public interface IPetRepository
    {
        Task<Pet> AddAsync(Pet pet);
        Task<List<Pet>> GetAllAsync();
        Task<Pet?> GetByIdAsync(Guid id);
        Task<Pet> UpdateAsync(Pet pet);
        Task DeleteAsync(Pet pet);
    }
}
    