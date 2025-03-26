using Server.Core.Entities;

namespace Server.API.Models
{
    public class FilePost
    {
        public string Name { get; set; }
        public List<User> SharedWith { get; set; }
    }
}
