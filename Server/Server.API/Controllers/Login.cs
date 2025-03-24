using Microsoft.AspNetCore.Mvc;
using Server.API.Models;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Login : ControllerBase
    {
        // POST api/<Login>
        [HttpPost]
        public ActionResult Post([FromBody] UserPost user)
        {
            return Ok(user);
        }
    }
}
