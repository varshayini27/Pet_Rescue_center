using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using petProfile.Database;
using petProfile.Model.DTO;
using petProfile.Model.Entities;
using System;
using Stripe;
using Stripe.Checkout;

namespace petProfile.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationPaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DonationPaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] DonationDto request)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = (long)(request.amount * 100), // convert to cents
                        Currency = "usd", // or "lkr" if supported
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = $"Donation to Rescue Center {request.rescue_center_id}"
                        }
                    },
                    Quantity = 1,
                }
            },
                Mode = "payment",
                SuccessUrl = "http://localhost:5173/donation",
                CancelUrl = "http://localhost:5173/donation",
            };

            var service = new SessionService();
            var session = service.Create(options);

            return Ok(new { sessionId = session.Id });
        }

        [HttpPost("confirm")]
        public async Task<IActionResult> ConfirmDonation([FromBody] DonationDto request)
        {
            var donation = new Donation
            {
                donation_id = Guid.NewGuid(),
                amount = request.amount,
                user_id = request.user_id,
                rescue_center_id = request.rescue_center_id,
                date = DateTime.UtcNow
            };

            _context.Donations.Add(donation);
            await _context.SaveChangesAsync();

            return Ok(donation);
        }
    }
}
