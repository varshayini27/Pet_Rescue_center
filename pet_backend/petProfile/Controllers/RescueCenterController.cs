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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRescueCenter(Guid id, [FromBody] UpdateRescueCenterRequest updatedCenter)
    {
        if (updatedCenter == null)
        {
            return BadRequest(new ApiResponse<string>(null, "Invalid request data", 400));
        }

        var center = await _centerRepository.UpdateAsync(id, updatedCenter);

        if (center == null)
        {
            return NotFound(new ApiResponse<string>(null, "Rescue Center not found", 404));
        }

        return Ok(new ApiResponse<RescueCenterResponse>(
            new RescueCenterResponse
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
                longitude = center.longitude
            },
            "Rescue Center updated successfully",
            200
        ));
    }



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


