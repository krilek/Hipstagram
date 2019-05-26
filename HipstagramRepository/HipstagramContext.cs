namespace HipstagramRepository
{
    using System;
    using System.IO;

    using HipstagramRepository.Models;
    using HipstagramRepository.Models.JoinEntities;

    using Microsoft.EntityFrameworkCore;

    public class HipstagramContext : DbContext
    {
        private const string DatabaseName = "hipstagram.db";

        public DbSet<Gallery> Galleries { get; set; }

        public DbSet<Log> Logs { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (File.Exists($"../{DatabaseName}"))
            {
                optionsBuilder.UseSqlite($"Data Source=../{DatabaseName}");
            }
            else
            {
                throw new Exception($"Unable to find DB in this location {Path.GetFullPath("..")}");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPhotos>().HasKey(t => new { t.UserId, t.PhotoId });
            modelBuilder.Entity<GalleryPhotos>().HasKey(t => new { t.GalleryId, t.PhotoId });
            modelBuilder.Entity<UserGalleries>().HasKey(t => new { t.GalleryId, t.UserId });
        }
    }
}