using System.Threading.Tasks;
namespace homeApi.Data

{

    public interface IcalendarRepository<T> where T : class

    {

        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);

        Task<T> SaveAsync(T entity);

    }

}