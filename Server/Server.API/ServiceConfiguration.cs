using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Server.Core;
using Server.Core.Repositories;
using Server.Core.Services;
using Server.Data;
using Server.Data.Repositories;
using Server.Service.Services;
using System.Text;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon;
using System.Text.Json.Serialization;

namespace Server.API
{
    public class ServiceConfiguration
    {
        public static void ConfigureServices(IServiceCollection services,IConfiguration configuration)
        {
            // הוספת JWT Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["JWT:Issuer"],
                        ValidAudience = configuration["JWT:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]))
                    };
                });

            // הוספת הרשאות מבוססות-תפקידים
            services.AddAuthorizationBuilder()
                       .AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"))
                       .AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"))
                       .AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));

            // Add services to the container.
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.WriteIndented = true;
            });
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddCors(opt => opt.AddPolicy("myPolicy", policy =>
            {
                policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            }));

            services.AddOpenApi();

            services.AddScoped<IRepositoryManager, RepositoryManager>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped(typeof(IService<>), typeof(Service<>));

            services.AddScoped<IAuthService,AuthService>();
            services.AddScoped<IAuthRepository, AuthRepository>();

            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IEncryptService, EncryptService>();
            services.AddScoped<IEncryptRepository, EncryptRepository>();

            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IEmailRepository, EmailRepository>();

            services.AddScoped<IFileUploadService, FileUploadService>();
            services.AddScoped<IFileUploadRepository, FileUploadRepository>();

            services.AddAWSService<IAmazonS3>();
            services.AddDefaultAWSOptions(new AWSOptions
            {
                Credentials = new BasicAWSCredentials(
                        configuration["AccessKeyID"],
                        configuration["SecretAccessKey"]
                    ),
                Region = RegionEndpoint.USEast1
            });

            services.AddDbContext<DataContext>();
            services.AddHttpContextAccessor();

            services.AddAutoMapper(typeof(MappingProfile));
            services.AddAutoMapper(typeof(Mapping));
        }
    }
}
