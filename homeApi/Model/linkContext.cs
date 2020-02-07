using Microsoft.EntityFrameworkCore;

namespace homeApi.Model
{    public class linkContext : DbContext
    {
        public linkContext()
        {
        }


        public linkContext(DbContextOptions<linkContext> options)
       : base(options)
        {
        }

        public DbSet<link> Links { get; set; }

          public DbSet<BlogPost> BlogPosts { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.UseSqlite("Filename=c:\\programowanie\\home02\\db.db");
        }
    }

}