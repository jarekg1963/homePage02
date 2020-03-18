using System;
using System.ComponentModel.DataAnnotations;
namespace homeApi.Model
{
    public class note
    {
        public int id { get; set; }

        
        public string title { get; set; }

        [StringLength(255)]
        public string text { get; set; }

      

      
    }

}