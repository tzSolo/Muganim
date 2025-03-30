using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.API.Models;
using Server.Core;
using Server.Core.DTOs;
using Server.Core.Entities;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionsController(IService<Permission> permissionService, IMapper mapper) : ControllerBase
    {
        private readonly IService<Permission> _permissionService = permissionService;
        private readonly IMapper _mapper = mapper;

        // GET: api/<PermissionsController>
        [HttpGet]
        public ActionResult Get()
        {
            var permissionsList = _permissionService.GetAllEntities();
            return Ok(_mapper.Map<IEnumerable<Permission>>(permissionsList));
        }

        // GET api/<PermissionsController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var permission = _permissionService.GetEntityById(id);
            if (permission == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<RoleDto>(permission));
        }

        // POST api/<PermissionsController>
        [HttpPost]
        public ActionResult Post([FromBody] PermissionPost permission)
        {
            var permissionMap = _mapper.Map<Permission>(permission);
            var newPermission = _permissionService.AddEntity(permissionMap);
            if (newPermission == null)
                return BadRequest();
            return Ok(_mapper.Map<Permission>(newPermission));
        }

        // PUT api/<PermissionsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] PermissionPost permission)
        {
            var permissionMap = _mapper.Map<Permission>(permission);
            permissionMap.Id = id;
            var updatedPermission = _permissionService.UpdateEntity(id, permissionMap);
            return Ok(_mapper.Map<Permission>(updatedPermission));
        }

        // DELETE api/<PermissionsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _permissionService.DeleteEntity(id);
            return Ok();
        }
    }
}
