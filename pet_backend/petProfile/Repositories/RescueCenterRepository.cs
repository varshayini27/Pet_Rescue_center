using petProfile.Database;
using petProfile.Interfaces;
using petProfile.Model.Entities;
using Microsoft.EntityFrameworkCore;
using petProfile.Model.DTO;
using petProfile.Model.DTOs;

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

        public async Task<List<RescueCenterResponse>> GetAllAsync()
        {
            var centers = await _context.RescueCenters
                                        .Include(c => c.Pets)
                                        .ToListAsync(); // Get all centers and their pets

            // Map the list of entities to a list of DTOs
            var dtos = centers.Select(center => new RescueCenterResponse
            {
                center_id = center.center_id,
                name = center.name,
                email = center.email, 
                phone_no = center.phone_no, 
                address = center.address,
                city = center.city,
                district = center.district,
                province = center.province,
                image_url = center.image_url, 
                history = center.history, 
                latitude = center.latitude, 
                longitude = center.longitude, 
                // Map the collection of pets for each center
                Pets = center.Pets.Select(p => new PetDto
                {
                    pet_id = p.pet_id,
                    name = p.name,
                    species = p.species,
                    breed = p.breed,
                    age = p.age,
                    gender = p.gender,
                    size = p.size,
                    weight = p.weight,
                    energy_level = p.energy_level,
                    vaccination_status = p.vaccination_status,
                    spayed_neutered = p.spayed_neutered,
                    good_with_children = p.good_with_children,
                    good_with_other_pets = p.good_with_other_pets,
                    description = p.description,
                    rescue_date = p.rescue_date,
                    rescue_location = p.rescue_location,
                    rescue_condition = p.rescue_condition,
                    rescued_by = p.rescued_by,
                    image_url = p.image_url,
                    adoption_status=p.adoption_status
                }).ToList()
            }).ToList(); 

            return dtos;
        }
        public async Task<RescueCenterResponse?> GetByIdAsync(Guid id)
        {
            var center = await _context.RescueCenters
                                       .Include(c => c.Pets)
                                       .FirstOrDefaultAsync(c => c.center_id == id);

            if (center == null)
            {
                return null;
            }

            // Map the entity to the DTO
            var dto = new RescueCenterResponse
            {
                center_id = center.center_id,
                name = center.name,
                city = center.city,
                district = center.district,
               
                Pets = center.Pets.Select(p => new PetDto
                {
                    pet_id = p.pet_id,
                    name = p.name,
                    species = p.species,
                    breed = p.breed,
                    age = p.age,
                    gender = p.gender,
                    size = p.size,
                    weight = p.weight,
                    energy_level = p.energy_level,
                    vaccination_status = p.vaccination_status,
                    spayed_neutered = p.spayed_neutered,
                    good_with_children = p.good_with_children,
                    good_with_other_pets = p.good_with_other_pets,
                    description = p.description,
                    rescue_date = p.rescue_date,
                    rescue_location = p.rescue_location,
                    rescue_condition = p.rescue_condition,
                    rescued_by = p.rescued_by,
                    image_url = p.image_url
                }).ToList()
            };

            return dto;
        }
        public async Task<RescueCenter?> GetEntityByIdAsync(Guid id)
        {
            // Return the entity directly, without mapping to a DTO
            return await _context.RescueCenters.FirstOrDefaultAsync(c => c.center_id == id);
        }
        //public async Task<RescueCenterResponse> UpdateAsync(RescueCenterResponse center)
        //{
        //    _context.RescueCenters.Update(center);
        //    await _context.SaveChangesAsync();
        //    return center;
        //}

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
