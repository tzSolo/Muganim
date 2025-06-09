using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.API.Models;
using Server.Core;
using Server.Core.DTOs;
using Server.Core.Entities;
using Server.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IService<User> userService, IUserService userService2, IAuthService authService, IService<Role> roleService, IMapper mapper) : ControllerBase
    {
        private readonly IService<User> _userService = userService;
        private readonly IUserService _userService2 = userService2;
        private readonly IAuthService _authService = authService;
        private readonly IService<Role> _roleService = roleService;
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
                return BadRequest(ex.Message);
            }
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var user = _userService2.GetEntityById(id);
            if (user == null)
                return NotFound();
            return Ok(_mapper.Map<UserDto>(user));
        }

        // POST api/<UsersController>
        [HttpPost("register")]
        public ActionResult Post([FromBody] UserPost user)
        {
            var userMap = _mapper.Map<User>(user);
            var newUser = _userService.AddEntity(userMap);
            if (newUser == null)
                return BadRequest("The data sent was invalid.");

            var userDto = _mapper.Map<UserDto>(newUser);
            var role = _roleService.GetEntityById(newUser.RoleId);
            var token = _authService.GenerateJwtToken(user.Email, [role?.Name], newUser.Id);
            return Ok(new { Token = token, User = userDto });
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] UserPost user)
        {
            var userMap = _mapper.Map<User>(user);
            userMap.Id = id;
            try
            {
                var updatedUser = _userService.UpdateEntity(id, userMap);
                return Ok(_mapper.Map<UserDto>(updatedUser));
            }
            catch (Exception exe)
            {
                return BadRequest(exe.Message);
            }
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
                return BadRequest(ex.Message);
            }
        }
    }
}
