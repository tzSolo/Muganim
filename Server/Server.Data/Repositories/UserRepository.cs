using Server.Core.Entities;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class UserRepository(DataContext dataContext) : IUserRepository
    {
        private readonly DataContext _dataContext = dataContext;
        public List<User> GetAll()
        {
            return _dataContext.Users.ToList();
        }
        public User GetById(int id)
        {
            return _dataContext.Users.FirstOrDefault(u => u.Id == id);
        }
        public User Add(User user)
        {
            _dataContext.Users.Add(user);
            _dataContext.SaveChanges();
            return new User();
        }
        public User Update(int id, User user)
        {
            _dataContext.Users.Update(user);
            return new User();
        }
        public void Delete(int id)
        {
             _dataContext.Users.Remove(GetById(id));
        }
    }
}
