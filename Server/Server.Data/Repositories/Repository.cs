using Microsoft.EntityFrameworkCore;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class Repository<T>(DataContext context) : IRepository<T> where T : class
    {
        private readonly DbSet<T> _dbSet = context.Set<T>();
        public T Add(T entity)
        {
            _dbSet.Add(entity);
            return entity;
        }
        public void Delete(int id)
        {
            _dbSet.Remove(GetById(id));
        }
        public IEnumerable<T> GetAll()
        {
            return _dbSet;
        }
        public T? GetById(int id)
        {
            return _dbSet.Find(id);
        }
        public T Update(int id, T entity)
        {
            _dbSet.Update(entity);
            return entity;
        }
    }
}
