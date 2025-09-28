using Microsoft.EntityFrameworkCore;
using petProfile.Database;
using petProfile.Interfaces;
using petProfile.Model.DTO;
using petProfile.Model.DTOs;
using petProfile.Model.Entities;

namespace petProfile.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly ApplicationDbContext _context;

        public PetRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Pet> AddAsync(Pet pet)
        {
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();
            return pet;
        }

        public async Task<List<PetDto>> GetAllAsync()
        {
            var pets = await _context.Pets
                .Include(p => p.RescueCenter)
                .ToListAsync();
            var dtos = pets.Select(p => new PetDto
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
                adoption_status = p.adoption_status,
                rescueCenter = p.RescueCenter == null ? null : new RescueCenterResponse
                {
                    center_id = p.RescueCenter.center_id,
                    name = p.RescueCenter.name,
                    email = p.RescueCenter.email,
                    phone_no = p.RescueCenter.phone_no,
                    address = p.RescueCenter.address,
                    city = p.RescueCenter.city,
                    district = p.RescueCenter.district,
                    province = p.RescueCenter.province,
                    image_url = p.RescueCenter.image_url,
                    history = p.RescueCenter.history
                }

            }).ToList();

            return dtos;
        }
        public async Task<List<PetDto>> GetAllByRescueCenterAsync(Guid rescueCenterId)
        {
            var pets = await _context.Pets
                .Include(p => p.RescueCenter)
                .Where(p => p.rescue_center_id == rescueCenterId)
                .ToListAsync();
            var dtos = pets.Select(p => new PetDto
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
                adoption_status = p.adoption_status,
                rescueCenter = p.RescueCenter == null ? null : new RescueCenterResponse
                {
                    center_id = p.RescueCenter.center_id,
                    name = p.RescueCenter.name,
                    email = p.RescueCenter.email,
                    phone_no = p.RescueCenter.phone_no,
                    address = p.RescueCenter.address,
                    city = p.RescueCenter.city,
                    district = p.RescueCenter.district,
                    province = p.RescueCenter.province,
                    image_url = p.RescueCenter.image_url,
                    history = p.RescueCenter.history
                }

            }).ToList();

            return dtos;
        }
        public async Task<Pet?> GetByIdAsync(Guid id)
        {
            return await _context.Pets
                .Include(p => p.RescueCenter)
                .FirstOrDefaultAsync(p => p.pet_id == id);
        }

        public async Task<Pet> UpdateAsync(Pet pet)
        {
            _context.Pets.Update(pet);
            await _context.SaveChangesAsync();
            return pet;
        }

        public async Task DeleteAsync(Pet pet)
        {
            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();
        }
    }
}
