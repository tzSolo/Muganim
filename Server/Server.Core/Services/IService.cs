using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core
{
    public interface IService<T> where T : class
    {
        IEnumerable<T> GetAllEntities();
        T? GetEntityById(int id);
        T AddEntity(T entity);
        T UpdateEntity(int id, T entity);
        void DeleteEntity(int id);
    }
}
