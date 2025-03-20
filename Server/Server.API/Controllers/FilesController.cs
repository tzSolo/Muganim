using Microsoft.AspNetCore.Mvc;
using Server.Core;
using Server.Core.Entities;
using File = Server.Core.Entities.File;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController(IService<File> fileService) : ControllerBase
    {
        private readonly IService<File> _fileService = fileService;

        // GET: api/<FilesController>
        [HttpGet]
        public IEnumerable<File> Get()
        {
            return _fileService.GetAllEntities().ToList();
        }

        // GET api/<FilesController>/5
        [HttpGet("{id}")]
        public File? Get(int id)
        {
            return _fileService.GetEntityById(id);
        }

        // POST api/<FilesController>
        [HttpPost]
        public void Post([FromBody] File file)
        {
            _fileService.AddEntity(file);
        }

        // PUT api/<FilesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] File file)
        {
            _fileService.UpdateEntity(id, file);
        }

        // DELETE api/<FilesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _fileService.DeleteEntity(id);
        }
    }
}
