using petProfile.Database;
using petProfile.Interfaces;
using petProfile.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace petProfile.Repositories
{
    public class RescueCenterRepository : IRescueCenterRepository
    {
        private readonly ApplicationDbContext _context;

        public RescueCenterRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<RescueCenter> AddAsync(RescueCenter center)
        {
            _context.RescueCenters.Add(center);
            await _context.SaveChangesAsync();
            return center;
        }

        public async Task<List<RescueCenter>> GetAllAsync()
        {
            return await _context.RescueCenters
              //  .Include(r => r.Pets) // 👈 Load pets related to each rescue center
                .ToListAsync();
        }
        public async Task<RescueCenter?> GetByIdAsync(Guid id)
        {
            return await _context.RescueCenters
                                // .Include(c => c.Pets) // optional
                                 .FirstOrDefaultAsync(c => c.center_id == id);
        }

        public async Task<RescueCenter> UpdateAsync(RescueCenter center)
        {
            _context.RescueCenters.Update(center);
            await _context.SaveChangesAsync();
            return center;
        }

        public async Task DeleteAsync(RescueCenter center)
        {
            _context.RescueCenters.Remove(center);
            await _context.SaveChangesAsync();
        }
        public async Task<RescueCenter?> GetByEmailAsync(string email)
        {
            return await _context.RescueCenters.FirstOrDefaultAsync(u => u.email == email);
        }
    }
}
