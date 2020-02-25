using homeApi.Model;
using System.Threading.Tasks;

namespace homeApi.Data
{
    public class calendarRepository<T> : IDataRepository<T> where T : class
    {
        private readonly linkContext _context;

        public calendarRepository(linkContext context)
        {
            _context = context;
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task<T> SaveAsync(T entity)
        {
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}