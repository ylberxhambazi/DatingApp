using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ChatrDate.Models
{
    public partial class AddaptAppDatingAPIContext : DbContext
    {
        public AddaptAppDatingAPIContext(DbContextOptions<AddaptAppDatingAPIContext> options)
            : base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Sample> Samples { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Like>()
                .HasKey(k => new { k.LikerId, k.LikeeId });

            modelBuilder.Entity<Like>()
                .HasOne(u => u.Likee)
                .WithMany(u => u.Likers)
                .HasForeignKey(u => u.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Like>()
                .HasOne(u => u.Liker)
                .WithMany(u => u.Likees)
                .HasForeignKey(u => u.LikerId)
                .OnDelete(DeleteBehavior.Restrict);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
