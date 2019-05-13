using HipstagramService.Models;
using Microsoft.EntityFrameworkCore;

namespace HipstagramService
{
    public class HipstagramContext : DbContext
    {
        public HipstagramContext(DbContextOptions<HipstagramContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }

}