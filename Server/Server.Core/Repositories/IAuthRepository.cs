using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IAuthRepository
    {
        string GenerateJwtToken(string email, string[] roles, int id);
    }
}
