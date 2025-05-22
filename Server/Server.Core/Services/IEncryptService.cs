using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IEncryptService
    {
        string? Encrypt(string text);
        string? Decrypt(string encryptText);
    }
}
