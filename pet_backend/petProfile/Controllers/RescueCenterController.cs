using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using petProfile.common;
using petProfile.Database;
using petProfile.Interfaces;
using petProfile.Model.DTOs;
using petProfile.Model.Entities;
using System;

namespace petProfile.Controllers;

[ApiController]
[Route("api/rescuecenter")]
public class RescueCenterController : ControllerBase
{
    private readonly IRescueCenterRepository _centerRepository;

    public RescueCenterController(IRescueCenterRepository centerRepository)
    {
        _centerRepository = centerRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var centers = await _centerRepository.GetAllAsync();
        return this.SendRes(centers, "Rescue Centers fetched successfully with pets", 200); ;
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var center = await _centerRepository.GetByIdAsync(id);
        if (center == null)
        {
            return NotFound(new ApiResponse<string>(null, "Rescue Center not found", 404));
        }
        return Ok(new ApiResponse<RescueCenterResponse>(center, "Rescue Center fetched successfully", 200));
    }

    // ✅ Update
    //[HttpPut("{id}")]
    //public async Task<IActionResult> UpdateRescueCenter(Guid id, [FromBody] RescueCenter updatedCenter)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    var existingCenter = await _centerRepository.GetByIdAsync(id);
    //    if (existingCenter == null)
    //    {
    //        return NotFound(new ApiResponse<string>(null, "Rescue Center not found", 404));
    //    }

    //    // Update editable fields
    //    // existingCenter.Name = updatedCenter.Name;
    //    // existingCenter.Location = updatedCenter.Location;
    //    // existingCenter.ContactNumber = updatedCenter.ContactNumber;

    //    var result = await _centerRepository.UpdateAsync(existingCenter);
    //    return Ok(new ApiResponse<RescueCenterResponse>(result, "Rescue Center updated successfully", 200));
    //}

    // ✅ Delete
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRescueCenter(Guid id)
    {
        var existingCenter = await _centerRepository.GetEntityByIdAsync(id);
        if (existingCenter == null)
        {
            return NotFound(new ApiResponse<string>(null, "Rescue Center not found", 404));
        }

        await _centerRepository.DeleteAsync(existingCenter);
        return Ok(new ApiResponse<string>(null, "Rescue Center deleted successfully", 200));
    }
}


