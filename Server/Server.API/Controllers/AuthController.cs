using Microsoft.AspNetCore.Mvc;
using Server.Core;
using Server.Core.Entities;
using Server.Core.Services;
using Server.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService authService, IUserService userService, IService<Role> roleService) : ControllerBase
    {
        private readonly IAuthService _authService = authService;
        private readonly IUserService _userService = userService;
        private readonly IService<Role> _roleService = roleService;

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginModel user)
        {
            var existUser = _userService.GetByEmailAndPassword(user.Email, user.Password);

            if (existUser != null)
            {
                var role = _roleService.GetEntityById(existUser.RoleId);
                var token = _authService.GenerateJwtToken(user.Email, [role.Name]);
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }
    }

    public class UserLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
