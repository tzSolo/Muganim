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
    public class RepositoryManager(DataContext context, IRepository<User> userRepository, IRepository<File> fileRepository) : IRepositoryManager
    {
        private readonly DataContext _context = context;
        public IRepository<User> Users { get; } = userRepository;
        public IRepository<File> Files { get; } = fileRepository;

        public void SaveChangesToDB()
        {
            _context.SaveChanges();
        }
    }
}
