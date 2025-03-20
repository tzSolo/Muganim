using Microsoft.AspNetCore.Mvc;
using Server.Core;
using Server.Core.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IService<User> userService) : ControllerBase
    {
        private readonly IService<User> _userService = userService;

        // GET: api/<UsersController>
        [HttpGet]
        public List<User> Get()
        {
            return _userService.GetAllEntities().ToList();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _userService.GetEntityById(id);
        }

        // POST api/<UsersController>
        [HttpPost]
        public void Post([FromBody] User user)
        {
            _userService.AddEntity(user);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User user)
        {
            _userService.UpdateEntity(id, user);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _userService.DeleteEntity(id);
        }
    }
}
