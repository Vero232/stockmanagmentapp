using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace StockManagmentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public LoginController(
           UserManager<IdentityUser> userManager,
           SignInManager<IdentityUser> signInManager
       )
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> Login(UserModel login)
        {

            var result = await _signInManager.PasswordSignInAsync(
                login.EmailAddress, login.Password, false, false
            );
      
            if (!result.Succeeded)
            {

                return Problem("Invalid Email or Password");
            }
      
            return Ok();

        }

    }
}
