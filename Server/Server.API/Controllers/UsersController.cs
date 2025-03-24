using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.API.Models;
using Server.Core;
using Server.Core.DTOs;
using Server.Core.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IService<User> userService, IMapper mapper) : ControllerBase
    {
        private readonly IService<User> _userService = userService;
        private readonly IMapper _mapper = mapper;

        // GET: api/<UsersController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var usersList = _userService.GetAllEntities().ToList();
                return Ok(_mapper.Map<IEnumerable<UserDto>>(usersList));
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred while processing your request.");
            }
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var user = _userService.GetEntityById(id);
            if (user == null)
                return NotFound();
            return Ok(_mapper.Map<UserDto>(user));
        }

        // POST api/<UsersController>
        [HttpPost]
        public ActionResult Post([FromBody] UserPost user)
        {
            var newUser = new User()
            {
                Name = user.Name,
                Password = user.Password,
                Email = user.Email,
                RoleId = user.RoleId,
                CreatedAt = DateTime.Now,
                CreatedBy = 1,//לעדכן לפי המשתמש המחובר כרגע
                UpdatedAt = DateTime.Now,
                UpdatedBy = 1,//לעדכן לפי המשתמש המחובר כרגע
            };
            if (_userService.AddEntity(newUser) == null)
                return BadRequest("The data sent was invalid.");
            return Ok(_mapper.Map<UserDto>(newUser));
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] User user)
        {
            var updatedUser = new User() { Name = user.Name, Password = user.Password, Email = user.Email, CreatedAt = DateTime.Now };
            if (_userService.UpdateEntity(id, updatedUser) == null)
                return BadRequest("The data sent was invalid.");
            return Ok(_mapper.Map<UserDto>(updatedUser));
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _userService.DeleteEntity(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred while processing your request.");
            }
        }
    }
}
