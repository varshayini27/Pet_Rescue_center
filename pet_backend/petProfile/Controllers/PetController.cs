using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using petProfile.Database;
using petProfile.Model.Entities;
using petProfile.common;
using petProfile.Model.DTOs;

namespace petProfile.Controllers
{
    [ApiController]
    [Route("api/pets")]
    public class PetController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PetController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET all pets for a rescue center
        [HttpGet("by-center/{centerId}")]
        public async Task<IActionResult> GetPetsByRescueCenter(Guid centerId)
        {
            var pets = await _context.Pets
                .Where(p => p.rescue_center_id == centerId)
                .Include(p => p.RescueCenter)
                .ToListAsync();

            return Ok(new ApiResponse<IEnumerable<Pet>>(pets, "Pets fetched successfully", 200));
        }

        // GET a single pet by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPetById(Guid id)
        {
            var pet = await _context.Pets
                .Include(p => p.RescueCenter)
                .FirstOrDefaultAsync(p => p.pet_id == id);

            if (pet == null)
                return NotFound(new ApiResponse<string>(null, "Pet not found", 404));

            return Ok(new ApiResponse<Pet>(pet, "Pet fetched successfully", 200));
        }

        // CREATE a new pet under a rescue center
        [HttpPost("create/{centerId}")]
        public async Task<IActionResult> CreatePet(Guid centerId, [FromBody] CreatePetRequest petRequest)
        {
            var center = await _context.RescueCenters.FindAsync(centerId);
            if (center == null)
                return NotFound(new ApiResponse<string>(null, "Rescue center not found", 404));

            var pet = new Pet
            {
                pet_id = Guid.NewGuid(),
                rescue_center_id = centerId,
                RescueCenter = center,
                name = petRequest.name,
                species = petRequest.species,
                breed = petRequest.breed,
                age = petRequest.age,
                gender = petRequest.gender,
                size = petRequest.size,
                weight = petRequest.weight,
                energy_level = petRequest.energy_level,
                vaccination_status = petRequest.vaccination_status,
                spayed_neutered = petRequest.spayed_neutered,
                good_with_children = petRequest.good_with_children,
                good_with_other_pets = petRequest.good_with_other_pets,
                description = petRequest.description,
                rescue_date = petRequest.rescue_date,
                rescue_location = petRequest.rescue_location,
                rescue_condition = petRequest.rescue_condition,
                is_adopted = false
            };

            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            // Return pet with rescue center included
            var createdPet = await _context.Pets
                .FirstOrDefaultAsync(p => p.pet_id == pet.pet_id);

            return Ok(new ApiResponse<Pet>(createdPet, "Pet created successfully", 200));
        }

        // Other CRUD methods (GET, PUT, DELETE) can stay the same

    // UPDATE a pet
    [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePet(Guid id, [FromBody] Pet updatedPet)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
                return NotFound(new ApiResponse<string>(null, "Pet not found", 404));

            // Update fields
            pet.name = updatedPet.name;
            pet.species = updatedPet.species;
            pet.breed = updatedPet.breed;
            pet.age = updatedPet.age;
            pet.gender = updatedPet.gender;
            pet.size = updatedPet.size;
            pet.weight = updatedPet.weight;
            pet.energy_level = updatedPet.energy_level;
            pet.vaccination_status = updatedPet.vaccination_status;
            pet.spayed_neutered = updatedPet.spayed_neutered;
            pet.good_with_children = updatedPet.good_with_children;
            pet.good_with_other_pets = updatedPet.good_with_other_pets;
            pet.description = updatedPet.description;
            pet.rescue_date = updatedPet.rescue_date;
            pet.rescue_location = updatedPet.rescue_location;
            pet.rescue_condition = updatedPet.rescue_condition;
            pet.rescued_by = updatedPet.rescued_by;
            pet.is_adopted = updatedPet.is_adopted;

            await _context.SaveChangesAsync();

            // Return updated pet with rescue center included
            var petWithCenter = await _context.Pets
                .Include(p => p.RescueCenter)
                .FirstOrDefaultAsync(p => p.pet_id == id);

            return Ok(new ApiResponse<Pet>(petWithCenter, "Pet updated successfully", 200));
        }

        // DELETE a pet
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(Guid id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
                return NotFound(new ApiResponse<string>(null, "Pet not found", 404));

            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>(null, "Pet deleted successfully", 200));
        }
    }
}
