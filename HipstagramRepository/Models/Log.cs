namespace HipstagramRepository.Models
{
    using System;

    public class Log
    {
        public string Activity { get; set; }

        public DateTime Date { get; set; }

        public int Id { get; set; }

        public User User { get; set; }
    }
}