using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class EncryptService(IEncryptRepository encryptRepository) : IEncryptService
    {
        private readonly IEncryptRepository _encryptRepository = encryptRepository;

        public string Decrypt(string encryptedText, Guid[] guids)
        {
            return _encryptRepository.Decrypt(encryptedText, guids);
        }
        public string Encrypt(string text, Guid[] guids)
        {
            return _encryptRepository.Encrypt(text, guids);
        }
    }
}
