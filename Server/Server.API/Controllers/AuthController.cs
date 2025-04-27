using Microsoft.AspNetCore.Mvc;
using Server.Core;
using Server.Core.Entities;
using Server.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(AuthService authService, IService<User> userService) : ControllerBase
    {
        private readonly AuthService _authService = authService;
        private readonly IService<User> _userService = userService;

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginModel user)
        {
            //אפשר לעשות את זה פשוט יותר כנראה שיעשה את הסינון כבר מול ה דטה בייס
            var existUser = _userService.GetAllEntities().FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);

            if (existUser != null)
            {
                var token = _authService.GenerateJwtToken(user.Email, ["123"]);
                //זאת השורה שאמורה להופיע לאחר הוספת ה include לuserService
                //var token = _authService.GenerateJwtToken(user.Email, [existUser.Role.Name]);
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
