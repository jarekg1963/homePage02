
using System.ComponentModel.DataAnnotations;

namespace homeApi.Model
{
    public partial class link
    {
        public string url { get; set; }
        public string description { get; set; }
        public string remarks { get; set; }
        public string createddate { get; set; }
        public string note { get; set; }
        public string group { get; set; }
        
        [Key]
        public int id { get; set; }

    }

}