namespace Server.API.Models
{
    public class RolePost
    {
        public string RoleName { get; set; }
        public string Description { get; set; }
        public List<PermissionPost> Permissions { get; set; }
    }
}
