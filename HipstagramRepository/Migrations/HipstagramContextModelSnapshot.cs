﻿// <auto-generated />
using System;
using HipstagramRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HipstagramRepository.Migrations
{
    [DbContext(typeof(HipstagramContext))]
    partial class HipstagramContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity("HipstagramRepository.Models.Gallery", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Gallery");
                });

            modelBuilder.Entity("HipstagramRepository.Models.JoinEntities.GalleryPhotos", b =>
                {
                    b.Property<int>("GalleryId");

                    b.Property<int>("PhotoId");

                    b.HasKey("GalleryId", "PhotoId");

                    b.HasIndex("PhotoId");

                    b.ToTable("GalleryPhotos");
                });

            modelBuilder.Entity("HipstagramRepository.Models.JoinEntities.UserPhotos", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("PhotoId");

                    b.HasKey("UserId", "PhotoId");

                    b.HasIndex("PhotoId");

                    b.ToTable("UserPhotos");
                });

            modelBuilder.Entity("HipstagramRepository.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Filename");

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("HipstagramRepository.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Login");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<bool>("isAdmin");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HipstagramRepository.Models.JoinEntities.GalleryPhotos", b =>
                {
                    b.HasOne("HipstagramRepository.Models.Gallery", "Gallery")
                        .WithMany("Photos")
                        .HasForeignKey("GalleryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HipstagramRepository.Models.Photo", "Photo")
                        .WithMany("Galleries")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HipstagramRepository.Models.JoinEntities.UserPhotos", b =>
                {
                    b.HasOne("HipstagramRepository.Models.Photo", "Photo")
                        .WithMany("Authors")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HipstagramRepository.Models.User", "User")
                        .WithMany("UserPhotos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
