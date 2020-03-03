
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using homeApi.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace homeApi.Controllers
{
    [Route("api/[controller]")]
    public class uploadfilesController : ControllerBase
    {
        private readonly string[] ACCEPTED_FILE_TYPES = new[] { ".jpg", ".jpeg", ".png" , ".pdf"};
        private readonly IWebHostEnvironment host;
        private readonly linkContext context;

        public uploadfilesController(IWebHostEnvironment host, linkContext context)

        {
            this.context = context;
            this.host = host;
        }

        [HttpPost]

        public async Task<IActionResult> Upload(IFormFile filesData)

        {

            if (filesData == null) return BadRequest("Null File");
            if (filesData.Length == 0)
            {
                return BadRequest("Empty File");
            }
            if (filesData.Length > 10 * 1024 * 1024) return BadRequest("Max file size exceeded.");

            if (!ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(filesData.FileName).ToLower())) return BadRequest("Invalid file type.");

            var uploadFilesPath = Path.Combine(host.WebRootPath, "uploads");

            if (!Directory.Exists(uploadFilesPath))

                Directory.CreateDirectory(uploadFilesPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(filesData.FileName);

            var filePath = Path.Combine(uploadFilesPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))

            {

                await filesData.CopyToAsync(stream);

            }

            var photo = new file { FileName = fileName };

            context.files.Add(photo);

            await context.SaveChangesAsync();

            return Ok();

        }




    }
}