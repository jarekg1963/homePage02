using System;
using System.ComponentModel.DataAnnotations;
namespace homeApi.Model
{
    public class file
    {
        public int id { get; set; }

        
        [Required]

        [StringLength(255)]
        public string FileName { get; set; }

        public int idPostu { get; set;}

      
    }

}