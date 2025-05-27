using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core
{
    public interface IUserService : IService<User>
    {
        User GetByEmailAndPassword(string email, string password);
    }
}
