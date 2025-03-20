using Server.Core;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service
{
    public class Service<T>(IRepository<T> repository, IRepositoryManager repositoryManager) : IService<T> where T : class
    {
        private readonly IRepository<T> _repository = repository;
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        public IEnumerable<T> GetAllEntities()
        {
            return _repository.GetAll();
        }
        public T? GetEntityById(int id)
        {
            return _repository.GetById(id);
        }
        public T AddEntity(T entity)
        {
            var newEntity = _repository.Add(entity);
            _repositoryManager.SaveChangesToDB();
            return newEntity;
        }
        public T UpdateEntity(int id, T entity)
        {
            var updatedEntity = _repository.Update(id, entity);
            _repositoryManager.SaveChangesToDB();
            return updatedEntity;
        }
        public void DeleteEntity(int id)
        {
            _repository.Delete(id);
            _repositoryManager.SaveChangesToDB();
        }
    }
}
