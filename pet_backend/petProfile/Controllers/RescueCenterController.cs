using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using petProfile.common;
using petProfile.Database;
using petProfile.Interfaces;
using petProfile.Model.Entities;
using System;

namespace petProfile.Controllers;

[ApiController]
[Route("api/rescuecenter")]
public class RescueCenterController : ControllerBase
{
    private readonly IRescueCenterRepository _repository;

    public RescueCenterController(IRescueCenterRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterRescueCenter([FromBody] RescueCenter center)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var created = await _repository.AddAsync(center);
        var response = new ApiResponse<RescueCenter>(created, "Rescue Center created successfully", 200);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var centers = await _repository.GetAllAsync();
        return this.SendRes(centers, "Rescue Centers fetched successfully with pets", 200); ;
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var center = await _repository.GetByIdAsync(id);
        if (center == null)
        {
            return NotFound(new ApiResponse<string>(null, "Rescue Center not found", 404));
        }
        return Ok(new ApiResponse<RescueCenter>(center, "Rescue Center fetched successfully", 200));
    }

    // ✅ Update
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRescueCenter(Guid id, [FromBody] RescueCenter updatedCenter)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var existingCenter = await _repository.GetByIdAsync(id);
        if (existingCenter == null)
        {
            return NotFound(new ApiResponse<string>(null, "Rescue Center not found", 404));
        }

        // Update editable fields
        // existingCenter.Name = updatedCenter.Name;
        // existingCenter.Location = updatedCenter.Location;
        // existingCenter.ContactNumber = updatedCenter.ContactNumber;

        var result = await _repository.UpdateAsync(existingCenter);
        return Ok(new ApiResponse<RescueCenter>(result, "Rescue Center updated successfully", 200));
    }

    // ✅ Delete
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRescueCenter(Guid id)
    {
        var existingCenter = await _repository.GetByIdAsync(id);
        if (existingCenter == null)
        {
            return NotFound(new ApiResponse<string>(null, "Rescue Center not found", 404));
        }

        await _repository.DeleteAsync(existingCenter);
        return Ok(new ApiResponse<string>(null, "Rescue Center deleted successfully", 200));
    }
}


