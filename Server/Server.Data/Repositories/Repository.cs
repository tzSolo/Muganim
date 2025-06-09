using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class Repository<T>(DataContext context, IHttpContextAccessor httpContextAccessor) : IRepository<T> where T : BaseModel
    {
        protected readonly DbSet<T> _dbSet = context.Set<T>();
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        public T Add(T entity)
        {
            entity.CreatedAt = DateTime.Now;
            entity.CreatedBy = GetLoggedInUserId();
            entity.UpdatedAt = DateTime.Now;
            entity.UpdatedBy = GetLoggedInUserId();
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
        public virtual T? GetById(int id)
        {
            return _dbSet.Find(id);
        }
        public T Update(int id, T entity)
        {
            entity.UpdatedAt = DateTime.Now;
            entity.UpdatedBy = GetLoggedInUserId();
            _dbSet.Update(entity);
            return entity;
        }

        private int GetLoggedInUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (int.TryParse(userIdClaim, out int userId))
            {
                return userId;
            }

            return 0;
        }
    }
}
