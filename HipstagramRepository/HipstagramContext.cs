namespace HipstagramRepository
{
    using HipstagramRepository.Models;
    using HipstagramRepository.Models.JoinEntities;

    using Microsoft.EntityFrameworkCore;

    public class HipstagramContext : DbContext
    {
        public HipstagramContext(DbContextOptions<HipstagramContext> options)
            : base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Gallery> Galleries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPhotos>().HasKey(t => new { t.UserId, t.PhotoId });
            modelBuilder.Entity<GalleryPhotos>().HasKey(t => new { t.GalleryId, t.PhotoId });
        }
    }
}