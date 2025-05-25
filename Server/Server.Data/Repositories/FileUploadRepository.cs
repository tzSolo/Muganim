using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = Server.Core.Entities.File;

namespace Server.Data.Repositories
{
    public class FileUploadRepository(IAmazonS3 s3Client, IConfiguration configuration) : IFileUploadRepository
    {
        private readonly IAmazonS3 _s3Client = s3Client;
        private readonly IConfiguration _configuration = configuration;

        public async Task<bool> UploadFileAsync(File file)
        {
            var bucketName = _configuration["AWSDetails:S3Bucket"];
            byte[] fileAsByteArray = Encoding.UTF8.GetBytes(file.Content);

            using var stream = new MemoryStream(fileAsByteArray);

            var uploadRequest = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = file.Name,
                InputStream = stream
            };

            var response = await _s3Client.PutObjectAsync(uploadRequest);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }
    }
}
