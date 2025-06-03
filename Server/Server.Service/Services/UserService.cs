using Server.Core;
using Server.Core.Entities;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class UserService(IUserRepository userRepository, IRepository<User> repository) : IUserService, IService<User>
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IRepository<User> _repository = repository;

        public IEnumerable<User> GetAllEntities()
        {
            return _repository.GetAll();
        }

        public User? GetEntityById(int id)
        {
            return _repository.GetById(id);
        }

        public User GetByEmailAndPassword(string email, string password)
        {
            return _userRepository.GetByEmailAndPassword(email, password);
        }

        public User UpdateEntity(int id, User user)
        {
            return _repository.Update(id, user);
        }

        public User AddEntity(User user)
        {
            return _repository.Add(user);
        }

        public void DeleteEntity(int id)
        {
            _repository.Delete(id);
        }
    }
}
