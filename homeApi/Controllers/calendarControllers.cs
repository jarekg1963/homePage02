using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using homeApi.Model;
using homeApi.Data;

namespace calendar.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class calendarController : ControllerBase
    {


        private readonly linkContext _context;
        private readonly IDataRepository<calendarM> _repo;
        public calendarController(linkContext context, IDataRepository<calendarM> repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<calendarM> Getcalendar()
        {
            return _context.calendar.OrderByDescending(p => p.id);
        }
        [HttpPost]
        public async Task<IActionResult> Pcalendar([FromBody] calendarM cal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(cal);
            var save = await _repo.SaveAsync(cal);

            return Ok();
        }

    }



}