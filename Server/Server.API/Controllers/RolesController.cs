using Microsoft.AspNetCore.Mvc;
using Server.Core.Entities;
using Server.Core;
using Server.Core.DTOs;
using AutoMapper;
using Server.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController(IService<Role> roleService, IMapper mapper) : ControllerBase
    {
        private readonly IService<Role> _roleService = roleService;
        private readonly IMapper _mapper = mapper;

        // GET: api/<RolesController>
        [HttpGet]
        public ActionResult Get()
        {
            var rolesList = _roleService.GetAllEntities();
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(rolesList).ToList());
        }

        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var role = _roleService.GetEntityById(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<RoleDto>(role));
        }

        // POST api/<RolesController>
        [HttpPost]
        public ActionResult Post([FromBody] RolePost role)
        {
            var roleMap = _mapper.Map<Role>(role);
            var newRole = _roleService.AddEntity(roleMap);
            if (newRole == null)
                return BadRequest();
            return Ok(_mapper.Map<RoleDto>(newRole));
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] RolePost role)
        {
            var roleMap = _mapper.Map<Role>(role);
            var updatedRole = _roleService.UpdateEntity(id, roleMap);
            return Ok(_mapper.Map<RoleDto>(updatedRole));
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _roleService.DeleteEntity(id);
            return Ok();
        }
    }
}
