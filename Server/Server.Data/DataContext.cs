using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using File = Server.Core.Entities.File;

namespace Server.Data
{
    public class DataContext(IConfiguration configuration, IHttpContextAccessor httpContextAccessor) : DbContext
    {
        private readonly IConfiguration _configuration = configuration;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        
        public DbSet<User> Users { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Role> Roles { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var mySqlServerVersionInfo = new MySqlServerVersion(new Version(8, 0, 41));

            optionsBuilder.UseMySql(_configuration["DBConnectionString"], mySqlServerVersionInfo);
        }

        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                BaseModel entity;

                if (entry.Entity is BaseModel model)
                {
                    entity = model;

                    if (entry.State == EntityState.Added)
                    {
                        entity.CreatedAt = DateTime.Now;
                        entity.CreatedBy = GetLoggedInUserId();
                    }

                    entity.UpdatedAt = DateTime.Now;
                    entity.UpdatedBy = GetLoggedInUserId();
                }
            }

            return base.SaveChanges();
        }

        private int GetLoggedInUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (int.TryParse(userIdClaim, out int userId))
            {
                return userId;
            }

            return 0;
        }
    }
}
