using Microsoft.AspNetCore.Mvc;
using Server.Core.Entities;
using Server.Core;
using Server.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController (IService<Role> roleService) : ControllerBase
    {
        private readonly IService<Role> _roleService = roleService;

        // GET: api/<RolesController>
        [HttpGet]
        public List<Role> Get()
        {
            return _roleService.GetAllEntities().ToList();
        }

        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public Role? Get(int id)
        {
            return _roleService.GetEntityById(id);
        }

        // POST api/<RolesController>
        [HttpPost]
        public void Post([FromBody] Role role)
        {
            _roleService.AddEntity(role);
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Role role)
        {
            _roleService.UpdateEntity(id, role);
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _roleService.DeleteEntity(id);
        }
    }
}
