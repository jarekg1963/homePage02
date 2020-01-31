using homeApi.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace homeApi.Controllers
{
    [Route("api/[controller]")]
    public class linkController : ControllerBase
    {


        private readonly linkContext _ctx;

        public linkController(linkContext ctx)
        {
            _ctx = ctx;
        }
        [HttpGet]

        public IActionResult Get()
        {
            var response = _ctx.Links.ToList();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var response = _ctx.Links.FirstOrDefault(d => d.id == id);
            return Ok(response);
        }

        [HttpPost]
        public IActionResult Post([FromBody] link li)
        {
            var entity = _ctx.Links.Add(li);
            _ctx.SaveChanges();

            var lastId = _ctx.Links.OrderByDescending(h => h.id).First();
            return Ok(lastId.id);
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            var entity = _ctx.Links.SingleOrDefault(h => h.id == id);
            if (entity == null) return NotFound("zły numer ID");
            _ctx.Links.Remove(entity);
            _ctx.SaveChanges();
            return Ok();
         }

      [HttpPut]
        public IActionResult UpdateItem( [FromBody]link di)
        {
            var entity = _ctx.Links.FirstOrDefault(e => e.id == di.id);
            if (entity == null)
            {
                return (BadRequest("Item was mot found "));
            }
            else
            {
               entity.url = di.url;
                 entity.description = di.description;
                 entity.remarks = di.remarks;
                entity.createddate = di.createddate;
                 entity.note = di.note;
                 entity.group = di.group;
                _ctx.SaveChanges();              
                return Ok(entity);

            }

        }


    }
}