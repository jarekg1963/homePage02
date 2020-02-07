
using System;
using System.ComponentModel.DataAnnotations;

namespace homeApi.Model

{

public class BlogPost

{

	[Key]

	public int id { get; set; }

	

	[Required]

	public string Creator { get; set; }

	

	[Required]

	public string Title { get; set; }

	

	[Required]

	public string Body { get; set; }

	
	[Required]

	public string Dt { get; set; }

}
}