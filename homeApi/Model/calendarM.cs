
using System.ComponentModel.DataAnnotations;

namespace homeApi.Model
{
    public class calendarM
    {
        public string start { get; set; }
        public string end { get; set; }
        public string title { get; set; }
        public string actions { get; set; }

        public string color { get; set; }

        public string allDay { get; set; }

        public string draggable { get; set; }

        public string resizable { get; set; }

        [Key]
        public int id { get; set; }

    }

}