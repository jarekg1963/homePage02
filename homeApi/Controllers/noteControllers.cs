using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using homeApi.Data;
using homeApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace notes.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class notesController : ControllerBase {

        private readonly linkContext _context;
        private readonly InoteRepository<note> _repo;

        public notesController (linkContext context, InoteRepository<note> repo) {
            _context = context;
            _repo = repo;
        }

        // GET: api/BlogPosts
        [HttpGet]
        public IEnumerable<note> Getnote () {
            return _context.notes.OrderByDescending (p => p.id);
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> Getnote ([FromRoute] int id) {
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }
            var tnote = await _context.notes.FindAsync (id);
            if (tnote == null) {
                return NotFound ();
            }
            return Ok (tnote);
        }

        // PUT: api/BlogPosts/5
        [HttpPut ("{id}")]
        public async Task<IActionResult> Putnote ([FromRoute] int id, [FromBody] note Znote) {
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            if (id != Znote.id) {
                return BadRequest ();
            }

            _context.Entry (Znote).State = EntityState.Modified;

            try {
                _repo.Update (Znote);
                var save = await _repo.SaveAsync(Znote);
            } catch (DbUpdateConcurrencyException) {
                if (!noteExists (id)) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

// Post 

[HttpPost]
        public async Task<IActionResult> PostBlogPost([FromBody] note dnote)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(dnote);
            var save = await _repo.SaveAsync(dnote);

            return Ok(dnote);
        }

// DELETE: api/BlogPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletenote([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dnote = await _context.notes.FindAsync(id);
            if (dnote == null)
            {
                return NotFound();
            }

            _repo.Delete(dnote);
            var save = await _repo.SaveAsync(dnote);

            return Ok(dnote);
        }



        private bool noteExists (int id) {
            return _context.notes.Any(e => e.id == id);
        }

    }

}