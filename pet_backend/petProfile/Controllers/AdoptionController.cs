using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using petProfile.Database;
using petProfile.Interfaces;
using petProfile.Model.Entities;
using petProfile.Model.DTO;
using petProfile.common;
using petProfile.Model.DTOs;

namespace petProfile.Controllers
{
    [ApiController]
    [Route("api/adoptions")]
    public class AdoptionController : ControllerBase
    {
        private readonly IAdoptionRepository _adoptionRepository;
        private readonly ApplicationDbContext _context;

        public AdoptionController(ApplicationDbContext context, IAdoptionRepository adoptionRepository)
        {
            _context = context;
            _adoptionRepository = adoptionRepository;
        }

        // GET all adoptions
        [HttpGet]
        public async Task<IActionResult> GetAdoptions()
        {
            var adoptions = await _context.Adoptions
                .Include(a => a.Pet)
                .ToListAsync();

            var dtos = adoptions.Select(a => new AdoptionDto
            {
                adoption_id = a.adoption_id,
                pet_id = a.pet_id,
                full_name = a.full_name ?? "",
                email = a.email ?? "",
                phone = a.phone ?? "",
                reason = a.reason,
                request_date = a.request_date,
                status = a.status,
                Pet = a.Pet == null ? null : new PetDto
                {
                    pet_id = a.Pet.pet_id,
                    name = a.Pet.name,
                    species = a.Pet.species,
                    breed = a.Pet.breed,
                    age = a.Pet.age,
                    gender = a.Pet.gender,
                    size = a.Pet.size,
                    weight = a.Pet.weight,
                    energy_level = a.Pet.energy_level,
                    vaccination_status = a.Pet.vaccination_status,
                    spayed_neutered = a.Pet.spayed_neutered,
                    good_with_children = a.Pet.good_with_children,
                    good_with_other_pets = a.Pet.good_with_other_pets,
                    description = a.Pet.description,
                    rescue_date = a.Pet.rescue_date,
                    rescue_location = a.Pet.rescue_location,
                    rescue_condition = a.Pet.rescue_condition,
                    rescue_center_id=a.Pet.rescue_center_id,
                    rescued_by = a.Pet.rescued_by,
                    image_url = a.Pet.image_url,
                    adoption_status = a.Pet.adoption_status
                }
            }).ToList();

            return Ok(new ApiResponse<IEnumerable<AdoptionDto>>(dtos, "Adoptions fetched successfully", 200));
        }

        // GET adoption by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdoptionById(Guid id)
        {
            var adoption = await _context.Adoptions
                .Include(a => a.Pet)
                .FirstOrDefaultAsync(a => a.adoption_id == id);

            if (adoption == null)
                return NotFound(new ApiResponse<string>(null, "Adoption not found", 404));

            var dto = new AdoptionDto
            {
                adoption_id = adoption.adoption_id,
                pet_id = adoption.pet_id,
                full_name = adoption.full_name ?? "",
                email = adoption.email ?? "",
                phone = adoption.phone ?? "",
                reason = adoption.reason,
                request_date = adoption.request_date,
                status = adoption.status,
                Pet = adoption.Pet == null ? null : new PetDto
                {
                    pet_id = adoption.Pet.pet_id,
                    name = adoption.Pet.name,
                    species = adoption.Pet.species,
                    breed = adoption.Pet.breed,
                    age = adoption.Pet.age,
                    gender = adoption.Pet.gender,
                    size = adoption.Pet.size,
                    weight = adoption.Pet.weight,
                    energy_level = adoption.Pet.energy_level,
                    vaccination_status = adoption.Pet.vaccination_status,
                    spayed_neutered = adoption.Pet.spayed_neutered,
                    good_with_children = adoption.Pet.good_with_children,
                    good_with_other_pets = adoption.Pet.good_with_other_pets,
                    description = adoption.Pet.description,
                    rescue_date = adoption.Pet.rescue_date,
                    rescue_location = adoption.Pet.rescue_location,
                    rescue_condition = adoption.Pet.rescue_condition,
                    rescued_by = adoption.Pet.rescued_by,
                    rescue_center_id=adoption.Pet.rescue_center_id,
                    image_url = adoption.Pet.image_url,
                    adoption_status = adoption.Pet.adoption_status
                }
            };

            return Ok(new ApiResponse<AdoptionDto>(dto, "Adoption fetched successfully", 200));
        }

        [HttpPost("{petId}")]
        public async Task<IActionResult> CreateAdoption(Guid petId, [FromBody] AdoptionCreateDto adoptionRequest)
        {
            var pet = await _context.Pets.FindAsync(petId);
            if (pet == null)
                return NotFound(new ApiResponse<string>(null, "Pet not found", 404));

            var adoption = new Adoption
            {
                adoption_id = Guid.NewGuid(),
                pet_id = petId,
                full_name = adoptionRequest.full_name,
                phone = adoptionRequest.phone,
                email = adoptionRequest.email,
                reason = adoptionRequest.reason,
                request_date = DateTime.UtcNow,
                status = "Pending",
               
            };

            _context.Adoptions.Add(adoption);
            await _context.SaveChangesAsync();

            // Map to DTO to avoid circular reference
            var adoptionDto = new AdoptionDto
            {
                adoption_id = adoption.adoption_id,
                pet_id = adoption.pet_id,
                full_name = adoption.full_name,
                phone = adoption.phone,
                email = adoption.email,
                reason = adoption.reason,
                request_date = adoption.request_date,
                status = adoption.status,
                Pet= adoption.Pet== null ? null : new PetDto
                {
                    pet_id=adoption.Pet.pet_id,
                    rescue_center_id=adoption.Pet.rescue_center_id,
                }
            };

            return Ok(new ApiResponse<AdoptionDto>(adoptionDto, "Adoption request created successfully", 200));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdoption(Guid id, [FromBody] UpdateAdoptionDto adoptionRequest)
        {
            var existingAdoption = await _adoptionRepository.GetByIdAsync(id);
            if (existingAdoption == null)
                return NotFound(new ApiResponse<string>(null, "Adoption not found", 404));

            // Update only what you allow
            if (!string.IsNullOrEmpty(adoptionRequest.Status))
            {
                existingAdoption.status = adoptionRequest.Status;
            }


            var updatedAdoption = await _adoptionRepository.UpdateAsync(existingAdoption);

            var adoptionDto = new AdoptionDto
            {
                adoption_id = updatedAdoption.adoption_id,
                pet_id = updatedAdoption.pet_id,
                full_name = updatedAdoption.full_name,
                phone = updatedAdoption.phone,
                email = updatedAdoption.email,
                reason = updatedAdoption.reason,
                request_date = updatedAdoption.request_date,
                status = updatedAdoption.status
            };

            // Map back to DTO (optional)


            return Ok(new ApiResponse<AdoptionDto>(adoptionDto, "Adoption updated successfully", 200));
        }



        // DELETE adoption
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdoption(Guid id)
        {
            var adoption = await _context.Adoptions.FindAsync(id);
            if (adoption == null)
                return NotFound(new ApiResponse<string>(null, "Adoption not found", 404));

            _context.Adoptions.Remove(adoption);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>(null, "Adoption deleted successfully", 200));
        }
    }
}
