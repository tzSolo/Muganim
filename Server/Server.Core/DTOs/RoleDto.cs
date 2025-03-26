using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class RoleDto : BaseModel
    {
        public string RoleName { get; set; }
        public string Description { get; set; }
        public List<PermissionDto> Permissions { get; set; }
    }
}
