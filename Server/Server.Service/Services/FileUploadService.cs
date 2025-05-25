using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = Server.Core.Entities.File;

namespace Server.Service.Services
{
    public class FileUploadService(IFileUploadRepository fileUploadRepository) : IFileUploadService
    {
        private readonly IFileUploadRepository _fileUploadRepository = fileUploadRepository;

        public async Task<bool> UploadFileAsync(File file)
        {
            return await _fileUploadRepository.UploadFileAsync(file);
        }
    }
}
