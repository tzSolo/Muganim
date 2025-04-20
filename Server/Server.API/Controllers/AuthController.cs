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
        public IActionResult Login([FromBody] LoginModel model)
        {
            // כאן יש לבדוק את שם המשתמש והסיסמה מול מסד הנתונים
            if (model.UserName == "admin" && model.Password == "admin123")
            {
                var token = _authService.GenerateJwtToken(model.UserName, new[] { "Admin" });
                return Ok(new { Token = token });
            }
            else if (model.UserName == "editor" && model.Password == "editor123")
            {
                var token = _authService.GenerateJwtToken(model.UserName, new[] { "Editor" });
                return Ok(new { Token = token });
            }
            else if (model.UserName == "viewer" && model.Password == "viewer123")
            {
                var token = _authService.GenerateJwtToken(model.UserName, new[] { "Viewer" });
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }
    }

    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
