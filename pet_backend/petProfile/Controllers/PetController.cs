using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using petProfile.Database;
using petProfile.Model.Entities;
using petProfile.common;
using petProfile.Model.DTOs;
using petProfile.Interfaces;
using petProfile.Model.DTO;

namespace petProfile.Controllers
{
    [ApiController]
    [Route("api/pets")]
    public class PetController : ControllerBase
    {
        private readonly IPetRepository _petRepository;

        private readonly ApplicationDbContext _context;

        public PetController(ApplicationDbContext context, IPetRepository petRepository)
        {
            _context = context;
            _petRepository = petRepository;
        }

        // GET all pets for a rescue center
        [HttpGet("by-center/{centerId}")]
        public async Task<IActionResult> GetPetsByRescueCenter(Guid centerId)
        {
        var pets = await _petRepository.GetAllByRescueCenterAsync(centerId);


            return Ok(new ApiResponse<IEnumerable<object>>(pets, "Pets fetched successfully", 200));
        }
        [HttpGet]
        public async Task<IActionResult> GetPets()
        {
            var pets = await _petRepository.GetAllAsync();

            return Ok(new ApiResponse<IEnumerable<object>>(pets, "Pets fetched successfully", 200));
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

        [HttpPost("{centerId}")]
        public async Task<IActionResult> CreatePet(Guid centerId, [FromBody] CreatePetRequest petRequest)
        {
            var center = await _context.RescueCenters.FindAsync(centerId);
            if (center == null)
                return NotFound(new ApiResponse<string>(null, "Rescue center not found", 404));

            var pet = new Pet
            {
                pet_id = Guid.NewGuid(),
                rescue_center_id = centerId,
                // You should not set the navigation property "RescueCenter = center" here.
                // EF Core will handle the relationship based on the rescue_center_id.
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
                image_url = petRequest.image_url
            };

            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            // Map the created entity to the DTO before returning
            var createdPetDto = new PetResponse
            {
                pet_id = pet.pet_id,
                name = pet.name,
                species = pet.species,
                breed = pet.breed,
                age = pet.age,
                gender = pet.gender,
                size = pet.size,
                weight = pet.weight,
                energy_level = pet.energy_level,
                vaccination_status = pet.vaccination_status,
                spayed_neutered = pet.spayed_neutered,
                good_with_children = pet.good_with_children,
                good_with_other_pets = pet.good_with_other_pets,
                description = pet.description,
                rescue_date = pet.rescue_date,
                rescue_location = pet.rescue_location,
                rescue_condition = pet.rescue_condition,
                image_url = pet.image_url,
                rescued_by = pet.rescued_by,
                adoption_status = pet.adoption_status,
            };

            return Ok(new ApiResponse<PetResponse>(createdPetDto, "Pet created successfully", 200));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePet(Guid id, [FromBody] UpdatePetRequest petRequest)
        {
            var existingPet = await _petRepository.GetByIdAsync(id);
            if (existingPet == null)
                return NotFound(new ApiResponse<string>(null, "Pet not found", 404));

            // Update fields from request
            existingPet.name = petRequest.name;
            existingPet.species = petRequest.species;
            existingPet.breed = petRequest.breed;
            existingPet.age = petRequest.age;
            existingPet.gender = petRequest.gender;
            existingPet.size = petRequest.size;
            existingPet.weight = petRequest.weight;
            existingPet.energy_level = petRequest.energy_level;
            existingPet.vaccination_status = petRequest.vaccination_status;
            existingPet.spayed_neutered = petRequest.spayed_neutered;
            existingPet.good_with_children = petRequest.good_with_children;
            existingPet.good_with_other_pets = petRequest.good_with_other_pets;
            existingPet.description = petRequest.description;
            existingPet.rescue_date = petRequest.rescue_date;
            existingPet.rescue_location = petRequest.rescue_location;
            existingPet.rescue_condition = petRequest.rescue_condition;
            existingPet.image_url = petRequest.image_url;

            // Save changes via repository
            var updatedPet = await _petRepository.UpdateAsync(existingPet);

            // Map entity back to DTO
            var updatedPetDto = new PetDto
            {
                pet_id = updatedPet.pet_id,
                name = updatedPet.name,
                species = updatedPet.species,
                breed = updatedPet.breed,
                age = updatedPet.age,
                gender = updatedPet.gender,
                size = updatedPet.size,
                weight = updatedPet.weight,
                energy_level = updatedPet.energy_level,
                vaccination_status = updatedPet.vaccination_status,
                spayed_neutered = updatedPet.spayed_neutered,
                good_with_children = updatedPet.good_with_children,
                good_with_other_pets = updatedPet.good_with_other_pets,
                description = updatedPet.description,
                rescue_date = updatedPet.rescue_date,
                rescue_location = updatedPet.rescue_location,
                rescue_condition = updatedPet.rescue_condition,
                image_url = updatedPet.image_url,
                rescued_by = updatedPet.rescued_by,
                adoption_status = updatedPet.adoption_status,
                rescueCenter = updatedPet.RescueCenter == null ? null : new RescueCenterResponse
                {
                    center_id = updatedPet.RescueCenter.center_id,
                    name = updatedPet.RescueCenter.name,
                    email = updatedPet.RescueCenter.email,
                    phone_no = updatedPet.RescueCenter.phone_no,
                    address = updatedPet.RescueCenter.address,
                    city = updatedPet.RescueCenter.city,
                    district = updatedPet.RescueCenter.district,
                    province = updatedPet.RescueCenter.province,
                    image_url = updatedPet.RescueCenter.image_url,
                    history = updatedPet.RescueCenter.history
                }
            };

            return Ok(new ApiResponse<PetDto>(updatedPetDto, "Pet updated successfully", 200));
        }


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
