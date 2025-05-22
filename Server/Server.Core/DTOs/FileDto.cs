using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class FileDto : BaseModel
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public List<UserDto> SharedWith { get; set; }
    }
}
