using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = Server.Core.Entities.File;

namespace Server.Core.Repositories
{
    public interface IRepositoryManager
    {
        IRepository<User> Users { get; }
        IRepository<File> Files { get; }
        IRepository<Permission> Permissions { get; }
        IRepository<Role> Roles { get; }

        void SaveChangesToDB();
    }
}
