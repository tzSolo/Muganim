namespace Server.API.Models
{
    public class RolePost
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<PermissionPost> Permissions { get; set; }
    }
}
