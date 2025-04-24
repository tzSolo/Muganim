using Microsoft.AspNetCore.Mvc;
using Server.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(AuthService authService) : ControllerBase
    {
        private readonly AuthService _authService = authService;

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginModel model)
        {
            // כאן יש לבדוק את שם המשתמש והסיסמה מול מסד הנתונים
            if (model.Name == "admin" && model.Password == "admin123")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Admin" });
                return Ok(new { Token = token });
            }
            else if (model.Name == "editor" && model.Password == "editor123")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Editor" });
                return Ok(new { Token = token });
            }
            else if (model.Name == "viewer" && model.Password == "viewer123")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Viewer" });
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }
    }

    public class UserLoginModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
