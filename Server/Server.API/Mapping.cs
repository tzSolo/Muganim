using AutoMapper;
using Server.API.Models;
using Server.Core.Entities;
using File = Server.Core.Entities.File;

namespace Server.API
{
    public class Mapping : Profile
    {
        public Mapping() {
            CreateMap<PermissionPost, Permission>();
            CreateMap<RolePost, Role>();
            CreateMap<UserPost, User>();
            CreateMap<FilePost, File>();
        }
    }
}
