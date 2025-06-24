using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class File : BaseModel
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public List<int> SharedWithIds { get; set; }
    }
}
