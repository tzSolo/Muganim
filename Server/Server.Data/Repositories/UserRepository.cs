using Server.Core.Entities;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Server.Data.Repositories
{
    public class UserRepository(DataContext context) : Repository<User>(context), IUserRepository
    {
        public User? GetByEmailAndPassword(string email, string password)
        {
            return _dbSet.FirstOrDefault(u => u.Email == email && u.Password == password);
        }

        public override IEnumerable<User> GetAll()
        {
            return _dbSet.Include(u => u.Files);
        }

        public override User? GetById(int id)
        {
            return _dbSet.Include(u => u.Files).FirstOrDefault(u => u.Id == id);
        }
    }
}
