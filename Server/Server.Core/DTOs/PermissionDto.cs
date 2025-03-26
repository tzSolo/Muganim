using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class PermissionDto : BaseModel
    {
        public string PermissionName { get; set; }
        public string Description { get; set; }
    }
}
