using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IEncryptRepository
    {
        string Encrypt(string text, Guid[] guids);
        string Decrypt(string encryptedText, Guid[] guids);
    }
}
