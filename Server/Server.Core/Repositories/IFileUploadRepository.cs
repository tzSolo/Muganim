using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = Server.Core.Entities.File;

namespace Server.Core.Repositories
{
    public interface IFileUploadRepository
    {
        Task<bool> UploadFileAsync(File file);
    }
}
