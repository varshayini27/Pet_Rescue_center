using Microsoft.AspNetCore.Mvc;

namespace petProfile.common
{
  
    public static class ControllerExtensions
    {
        public static IActionResult SendRes<T>(this ControllerBase controller, T data, string message, int status)
        {
            var response = new ApiResponse<T>(data, message, status);
            return controller.Ok(response);
        }
    }

}
