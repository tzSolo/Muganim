using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class EncryptRepository : IEncryptRepository
    {
        public string Decrypt(string encryptedText, Guid[] guids)
        {
            return DecryptStringByAes(encryptedText, guids[0].ToByteArray(), guids[1].ToByteArray());
        }
        private static string DecryptStringByAes(string text, byte[] Key, byte[] IV)
        {
            string decryptText;

            using Aes aes = Aes.Create();
            aes.Key = Key;
            aes.IV = IV;

            ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
            byte[] textAsBytesArr = Convert.FromBase64String(text);
            using MemoryStream msDecrypt = new(textAsBytesArr);
            using (CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read))
            {
                using StreamReader srDecrypt = new(csDecrypt);
                decryptText = srDecrypt.ReadToEnd();
            }

            return decryptText;
        }
        public string Encrypt(string text, Guid[] guids)
        {
            return EncryptStringByAes(text, guids[0].ToByteArray(), guids[1].ToByteArray());
        }

        private static string EncryptStringByAes(string text, byte[] Key, byte[] IV)
        {
            byte[] encrypted;

            using Aes aes = Aes.Create();
            aes.Key = Key;
            aes.IV = IV;

            ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

            using MemoryStream msEncrypt = new();
            using (CryptoStream csEncrypt = new(msEncrypt, encryptor, CryptoStreamMode.Write))
            {
                using StreamWriter swEncrypt = new(csEncrypt);
                swEncrypt.Write(text);
            }

            encrypted = msEncrypt.ToArray();
            return Convert.ToBase64String(encrypted);
        }
    }
}
