using Server.API;

var builder = WebApplication.CreateBuilder(args);

ServiceConfiguration.ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("myPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();