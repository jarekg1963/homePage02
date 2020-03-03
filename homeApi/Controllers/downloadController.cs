
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace filedownload.Controllers
{

    [Route("api/[controller]")]
    public class downloadfilesController : ControllerBase
    {

        private readonly IWebHostEnvironment host;
        public downloadfilesController(IWebHostEnvironment host)
        {
            this.host = host;
        }
        public async Task<FileStream> DownloadFile(string fileName)

        {
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            currentDirectory = currentDirectory + "\\src\\assets";

            var downloadFilesPath = Path.Combine(host.WebRootPath, "uploads");

           // var file = Path.Combine(Path.Combine(currentDirectory, "attachments"), fileName);
            var file = Path.Combine(downloadFilesPath, fileName);

            return new FileStream(file, FileMode.Open, FileAccess.Read);

        }
    }
}