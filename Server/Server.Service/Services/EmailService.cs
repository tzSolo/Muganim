using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class EmailService(IEmailRepository emailRepository) : IEmailService
    {
        private readonly IEmailRepository _emailRepository = emailRepository;

        public Task SendEmailAsync(string toEmail, string subject, string body)
        {
            return _emailRepository.SendEmailAsync(toEmail, subject, body);
        }
    }
}
