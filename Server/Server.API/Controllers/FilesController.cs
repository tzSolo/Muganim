using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.API.Models;
using Server.Core;
using Server.Core.DTOs;
using Server.Core.Entities;
using Server.Core.Services;
using Server.Data;
using Server.Service.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using File = Server.Core.Entities.File;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController(IService<File> fileService, IEncryptService encryptService, IFileUploadService uploadService, IEmailService emailService, IService<User> userService, IMapper mapper, DataContext context) : ControllerBase
    {
        private readonly IService<File> _fileService = fileService;
        private readonly IEncryptService _encryptService = encryptService;
        private readonly IFileUploadService _uploadService = uploadService;
        private readonly IEmailService _emailService = emailService;
        private readonly IService<User> _userService = userService;
        private readonly IMapper _mapper = mapper;
        private readonly DataContext _context = context;

        // GET: api/<FilesController>
        [HttpGet]
        public ActionResult Get()
        {
            var filesList = _fileService.GetAllEntities();
            return Ok(_mapper.Map<IEnumerable<FileDto>>(filesList).ToList());
        }

        // GET api/<FilesController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id, [FromHeader] Guid password1, [FromHeader] Guid password2)
        {
            var file = _fileService.GetEntityById(id);
            if (file == null)
            {
                return NotFound();
            }
            var decryptedFileContent = _encryptService.Decrypt(file.Content, [password1, password2]);
            file.Content = decryptedFileContent;

            var decryptedFileName = _encryptService.Decrypt(file.Name, [password1, password2]);
            file.Name = decryptedFileName;
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
            var recipientsIds = new List<int> { fileMap.CreatedBy };
            recipientsIds.AddRange(fileMap.SharedWithIds);

            var recipients = new List<User>();
            foreach (var userId in recipientsIds)
            {
                var user = _userService.GetEntityById(userId);
                if (user != null)
                {
                    recipients.Add(user);
                }
            }

            foreach (var user in recipients)
            {
                try
                {
                    await _emailService.SendEmailAsync(
                      user.Email,
                      "Decryption Credentials for File",
                      $"Dear {user.Name},\n\n" +
                      "Below are the credentials required to decrypt the file:\n\n" +
                      $"File Name: {encryptFileName}\n" +
                      "Decryption Passwords:\n\n" +
                      $"Password 1: {password[0]}\n" +
                      $"Password 2: {password[1]}\n\n" +
                      "Please ensure you keep this information secure and do not share it with anyone.\n\n" +
                      "Best regards,\n" +
                      "Muganim Team"
                    );
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to send email to {user.Email}: {ex.Message}");
                }
            }

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
            try
            {
                var updatedFile = _fileService.UpdateEntity(id, fileMap);
                return Ok(_mapper.Map<FileDto>(updatedFile));
            }
            catch (Exception exe)
            {
                return BadRequest(exe.Message);
            }
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
