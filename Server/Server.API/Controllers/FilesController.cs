using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.API.Models;
using Server.Core;
using Server.Core.DTOs;
using Server.Core.Services;
using Server.Service.Services;
using File = Server.Core.Entities.File;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController(IService<File> fileService, IEncryptService encryptService, IMapper mapper) : ControllerBase
    {
        private readonly IService<File> _fileService = fileService;
        private readonly IEncryptService _encryptService = encryptService;
        private readonly IMapper _mapper = mapper;
     
        // GET: api/<FilesController>
        [HttpGet]
        public ActionResult Get()
        {
            var filesList = _fileService.GetAllEntities();
            return Ok(_mapper.Map<IEnumerable<FileDto>>(filesList).ToList());
        }

        // GET api/<FilesController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var file = _fileService.GetEntityById(id);
            if (file == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<FileDto>(file));
        }

        // POST api/<FilesController>
        [HttpPost]
        public ActionResult Post([FromBody] FilePost file)
        {
            var fileMap = _mapper.Map<File>(file);
            var fileContent = _encryptService.Encrypt(fileMap.Content);
            if (fileContent != null)
            {
                fileMap.Content = fileContent;
                var newFile = _fileService.AddEntity(fileMap);                    
                return Ok(_mapper.Map<FileDto>(newFile));
            }
            return BadRequest();
        }

        // PUT api/<FilesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] FilePost file)
        {
            var fileMap = _mapper.Map<File>(file);
            fileMap.Id = id;
            var updatedFile = _fileService.UpdateEntity(id, fileMap);
            return Ok(_mapper.Map<FileDto>(updatedFile));
        }

        // DELETE api/<FilesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _fileService.DeleteEntity(id);
            return Ok();
        }
    }
}
