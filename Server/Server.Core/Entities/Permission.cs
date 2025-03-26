using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class Permission : BaseModel
    {
        public string PermissionName { get; set; }
        public string Description { get; set; }
    }
}
