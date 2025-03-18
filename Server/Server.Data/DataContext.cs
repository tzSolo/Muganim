using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data
{
    public class DataContext
    {
        public List<User> Users { get; set; }

        public DataContext()
        {
            Users =
                [
                new User() { Id = 1, Name = "name1", Password = "123456" },
                new User() { Id = 2, Name = "name2", Password = "852852" }
                ];
        }
    }
}
