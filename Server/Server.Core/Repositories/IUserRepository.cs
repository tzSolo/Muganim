using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User GetByEmailAndPassword(string email, string password);
    }
}
