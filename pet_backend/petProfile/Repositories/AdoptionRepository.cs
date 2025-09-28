using petProfile.Database;
using petProfile.Interfaces;
using petProfile.Model.DTO;
using petProfile.Model.DTOs;
using petProfile.Model.Entities;
using Microsoft.EntityFrameworkCore;


namespace petProfile.Repositories
{
    
        public class AdoptionRepository : IAdoptionRepository
        {
            private readonly ApplicationDbContext _context;

            public AdoptionRepository(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Adoption> AddAsync(Adoption adoption)
            {
                _context.Adoptions.Add(adoption);
                await _context.SaveChangesAsync();
                return adoption;
            }

            public async Task<List<AdoptionDto>> GetAllAsync()
            {
                var adoptions = await _context.Adoptions
                    .Include(a => a.Pet)
                    .ThenInclude(p => p.RescueCenter)
                    .Include(a => a.User)
                    .ToListAsync();

                return adoptions.Select(a => new AdoptionDto
                {
                    adoption_id = a.adoption_id,
                    pet_id = a.pet_id,
                    full_name = a.full_name,
                    email = a.email,
                    phone = a.phone,
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
                        rescued_by = a.Pet.rescued_by,
                        image_url = a.Pet.image_url,
                        adoption_status = a.Pet.adoption_status,
                        rescueCenter = a.Pet.RescueCenter == null ? null : new RescueCenterResponse
                        {
                            center_id = a.Pet.RescueCenter.center_id,
                            name = a.Pet.RescueCenter.name,
                            email = a.Pet.RescueCenter.email,
                            phone_no = a.Pet.RescueCenter.phone_no,
                            address = a.Pet.RescueCenter.address,
                            city = a.Pet.RescueCenter.city,
                            district = a.Pet.RescueCenter.district,
                            province = a.Pet.RescueCenter.province,
                            image_url = a.Pet.RescueCenter.image_url,
                            history = a.Pet.RescueCenter.history
                        }
                    },

                    User = a.User == null ? null : new UserDto
                    {
                        user_id = a.User.user_id,
                        //name = a.User.name,
                        //email = a.User.email
                    }

                }).ToList();
            }

        //    public async Task<AdoptionDto?> GetByIdAsync(Guid id)
        //    {
        //        var adoption = await _context.Adoptions
        //            .Include(a => a.Pet)
        //            .ThenInclude(p => p.RescueCenter)
        //            .Include(a => a.User)
        //            .FirstOrDefaultAsync(a => a.adoption_id == id);

        //        if (adoption == null) return null;

        //    return new AdoptionDto
        //    {
        //        adoption_id = adoption.adoption_id,
        //        pet_id = adoption.pet_id,
        //        full_name = adoption.full_name,
        //        email = adoption.email,
        //        phone = adoption.phone,
        //        reason = adoption.reason,
        //        request_date = adoption.request_date,
        //        status = adoption.status,

        //        Pet = adoption.Pet == null ? null : new PetDto
        //        {
        //            pet_id = adoption.Pet.pet_id,
        //            name = adoption.Pet.name,
        //            species = adoption.Pet.species,
        //            breed = adoption.Pet.breed,
        //            age = adoption.Pet.age,
        //            gender = adoption.Pet.gender,
        //            size = adoption.Pet.size,
        //            weight = adoption.Pet.weight,
        //            energy_level = adoption.Pet.energy_level,
        //            vaccination_status = adoption.Pet.vaccination_status,
        //            spayed_neutered = adoption.Pet.spayed_neutered,
        //            good_with_children = adoption.Pet.good_with_children,
        //            good_with_other_pets = adoption.Pet.good_with_other_pets,
        //            description = adoption.Pet.description,
        //            rescue_date = adoption.Pet.rescue_date,
        //            rescue_location = adoption.Pet.rescue_location,
        //            rescue_condition = adoption.Pet.rescue_condition,
        //            rescued_by = adoption.Pet.rescued_by,
        //            image_url = adoption.Pet.image_url,
        //            adoption_status = adoption.Pet.adoption_status
        //        },

        //        User = adoption.User == null ? null : new UserDto
        //        {
        //            user_id = adoption.User.user_id,
        //            //name = adoption.User.name,
        //            //email = adoption.User.email
        //        }
        //    };
        //}
        public async Task<Adoption?> GetByIdAsync(Guid id)
        {
            return await _context.Adoptions
                .Include(p => p.Pet)
                .FirstOrDefaultAsync(p => p.adoption_id == id);
        }
        public async Task<Adoption> UpdateAsync(Adoption adoption)
            {
                _context.Adoptions.Update(adoption);
                await _context.SaveChangesAsync();
                return adoption;
            }

            public async Task DeleteAsync(Adoption adoption)
            {
                _context.Adoptions.Remove(adoption);
                await _context.SaveChangesAsync();
            }
        }
    }

