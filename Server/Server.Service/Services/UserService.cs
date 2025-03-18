using Server.Core.Entities;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class UserService(IUserRepository userRepository) : IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;

        public IEnumerable<User> GetAll()
        {
            return _userRepository.GetAll();
        }
        public User GetById(int id)
        {
            return _userRepository.GetById(id);
        }
        public User Add(User user)
        {
            return _userRepository.Add(user);
        }
        public User Update(int id, User user)
        {
            return _userRepository.Update(id, user);
        }
        public void Delete(int id)
        {
            _userRepository.Delete(id);
        }
    }
}
