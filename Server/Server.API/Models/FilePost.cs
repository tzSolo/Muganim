namespace Server.API.Models
{
    public class FilePost
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public List<UserPost> SharedWith { get; set; }
    }
}
