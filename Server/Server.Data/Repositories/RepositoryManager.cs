using Server.Core.Entities;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = Server.Core.Entities.File;

namespace Server.Data.Repositories
{
    public class RepositoryManager(DataContext context, IRepository<User> userRepository, IRepository<File> fileRepository, IRepository<Permission> permissionRepository, IRepository<Role> roleRepository) : IRepositoryManager
    {
        private readonly DataContext _context = context;
        public IRepository<User> Users { get; } = userRepository;
        public IRepository<File> Files { get; } = fileRepository;
        public IRepository<Permission> Permissions { get; } = permissionRepository;
        public IRepository<Role> Roles { get; } = roleRepository;

        public void SaveChangesToDB()
        {
            _context.SaveChanges();
        }
    }
}
