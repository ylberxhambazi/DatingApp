using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ChatrDate.Models
{
    public class AddaptAppDatingAPIContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public AddaptAppDatingAPIContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Visitors> Visitors { get; set; }
        public DbSet<Favorites> Favorites { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<UserRole>(userRole =>
            // {
            //     userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

            //     userRole.HasOne(ur => ur.Role)
            //         .WithMany(r => r.UserRoles)
            //         .HasForeignKey(ur => ur.RoleId)
            //         .IsRequired();


            //     userRole.HasOne(ur => ur.User)
            //         .WithMany(r => r.UserRoles)
            //         .HasForeignKey(ur => ur.UserId)
            //         .IsRequired();
            // });
            modelBuilder.Entity<User>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<Role>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

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

            modelBuilder.Entity<Visitors>()
                .HasKey(k => new { k.VisitorId });

            modelBuilder.Entity<Visitors>()
                .HasOne(u => u.VisitorUser)
                .WithMany(u => u.ViewVisitors)
                .HasForeignKey(u => u.VisitoredUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Visitors>()
                .HasOne(u => u.VisitedUser)
                .WithMany(u => u.Visitores)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Favorites>()
                .HasKey(k => new { k.FavoriteId });

            modelBuilder.Entity<Favorites>()
                .HasOne(f => f.User)
                .WithMany(u => u.FavoritedBy)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Favorites>()
                .HasOne(f => f.FavoritedUser)
                .WithMany()
                .HasForeignKey(f => f.FavoritedUserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
