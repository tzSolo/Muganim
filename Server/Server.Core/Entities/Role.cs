using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Server.Core.Entities
{
    public class Role : BaseModel
    {
        public string RoleName { get; set; }
        public string Description { get; set; }
        public List<Permission> Permissions { get; set; }
    }
}
