using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Server.Core.Entities;
using Server.Core.Repositories;
using Server.Core.Services;

namespace Server.Service.Services
{
    public class AuthService(IAuthRepository authRepository) : IAuthService
    {
        private readonly IAuthRepository _authRepository = authRepository;

        public string GenerateJwtToken(string email, string[] roles, int id)
        {
            return _authRepository.GenerateJwtToken(email, roles, id);
        }
    }
}
