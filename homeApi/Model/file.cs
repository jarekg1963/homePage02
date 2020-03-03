using System;
using System.ComponentModel.DataAnnotations;
namespace homeApi.Model
{
    public class file
    {
        public int Id { get; set; }

        
        [Required]

        [StringLength(255)]
        public string FileName { get; set; }

      
    }

}