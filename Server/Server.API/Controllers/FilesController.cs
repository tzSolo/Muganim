using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.API.Models;
using Server.Core;
using Server.Core.DTOs;
using Server.Core.Services;
using Server.Service.Services;
using System.Threading.Tasks;
using File = Server.Core.Entities.File;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController(IService<File> fileService, IEncryptService encryptService, IFileUploadService uploadService, IEmailService emailService, IMapper mapper) : ControllerBase
    {
        private readonly IService<File> _fileService = fileService;
        private readonly IEncryptService _encryptService = encryptService;
        private readonly IFileUploadService _uploadService = uploadService;
        private readonly IEmailService _emailService = emailService;
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
        public async Task<ActionResult> Post([FromBody] FilePost file)
        {
            var fileMap = _mapper.Map<File>(file);
            var password = new Guid[2] { Guid.NewGuid(), Guid.NewGuid() };
            var encryptFileContent = _encryptService.Encrypt(fileMap.Content, password);
            var encryptFileName = _encryptService.Encrypt(fileMap.Name, password);

            if (encryptFileContent == null)
            {
                return BadRequest("File is empty.");
            }

            fileMap.Name = encryptFileName;
            fileMap.Content = encryptFileContent;
            var newFile = _fileService.AddEntity(fileMap);
            await _emailService.SendEmailAsync("t0504114734@gmail.com", "Muganim password", $"The password is : {password[0]} + {password[1]}");

            try
            {
                await _uploadService.UploadFileAsync(newFile);
                return Ok(_mapper.Map<FileDto>(newFile));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
