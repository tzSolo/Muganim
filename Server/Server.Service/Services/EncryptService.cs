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
    public class EncryptService : IEncryptService
    {
        public string Decrypt(string encryptedText)
        {
            return DecryptStringByAes(encryptedText, new Guid().ToByteArray(), new Guid().ToByteArray());
        }

        private static string DecryptStringByAes(string text, byte[] Key, byte[] IV)
        {
            string decryptText;

            using Aes aes = Aes.Create();
            aes.Key = Key;
            aes.IV = IV;

            ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
            byte[] textAsBytesArr = Encoding.UTF8.GetBytes(text);
            using MemoryStream msDecrypt = new(textAsBytesArr);
            using CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read);
            using StreamReader srDecrypt = new(csDecrypt);
            decryptText = srDecrypt.ReadToEnd();

            return decryptText;
        }

        public string? Encrypt(string text)
        {
            var guidKey = Guid.NewGuid().ToByteArray();
            var guidVI = Guid.NewGuid().ToByteArray();
            return EncryptStringByAes(text, guidKey, guidVI);
        }

        private static string? EncryptStringByAes(string text, byte[] Key, byte[] IV)
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
            return Encoding.UTF8.GetString(encrypted);
        }
    }
}
