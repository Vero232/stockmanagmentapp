using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace StockManagmentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public RegisterController(
           UserManager<IdentityUser> userManager,
           SignInManager<IdentityUser> signInManager
       )
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }




        [HttpPost]
        public async Task<IActionResult> Register(UserModel registration)
        {
            if (!ModelState.IsValid)
                return Forbid();

            var newUser = new IdentityUser
            {
                Email = registration.EmailAddress,
                UserName = registration.EmailAddress,
            };

            var result = await _userManager.CreateAsync(newUser, registration.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors.Select(x => x.Description))
                {
                    ModelState.AddModelError("", error);
                }
            }

            return Ok();

        }
    }
}
