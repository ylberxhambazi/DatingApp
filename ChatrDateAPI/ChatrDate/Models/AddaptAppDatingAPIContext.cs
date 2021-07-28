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

        public virtual DbSet<Photo> Photos { get; set; }
        public virtual DbSet<Sample> Samples { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Photo>(entity =>
            {
                entity.Property(e => e.DateAdded).HasColumnType("datetime");

                entity.Property(e => e.Url).HasColumnType("nvarchar(max)");
            });

            modelBuilder.Entity<Sample>(entity =>
            {
                entity.HasKey(e => e.MemberId)
                    .HasName("PK__Samples__B29B85343648B061");

                entity.HasIndex(e => e.Country, "country");

                entity.HasIndex(e => e.Email, "email");

                entity.HasIndex(e => e.Gender, "gender");

                entity.HasIndex(e => e.Race, "race");

                entity.HasIndex(e => e.State, "state");

                entity.Property(e => e.MemberId)
                    .ValueGeneratedNever()
                    .HasColumnName("member_id");

                entity.Property(e => e.AgeFrom).HasColumnName("age_from");

                entity.Property(e => e.AgeTo).HasColumnName("age_to");

                entity.Property(e => e.Birthdate)
                    .HasColumnType("date")
                    .HasColumnName("birthdate");

                entity.Property(e => e.BodyType)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("body_type");

                entity.Property(e => e.City)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("city");

                entity.Property(e => e.Country)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("country")
                    .IsFixedLength(true);

                entity.Property(e => e.Description)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.Drink)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("drink");

                entity.Property(e => e.Education)
                    .HasMaxLength(300)
                    .IsUnicode(false)
                    .HasColumnName("education");

                entity.Property(e => e.Email)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.EyeColor)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("eye_color");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("first_name");

                entity.Property(e => e.Gender)
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .HasColumnName("gender");

                entity.Property(e => e.HairColor)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("hair_color");

                entity.Property(e => e.HaveChildren)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("have_children");

                entity.Property(e => e.Headline)
                    .IsUnicode(false)
                    .HasColumnName("headline");

                entity.Property(e => e.Height)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("height");

                entity.Property(e => e.Interests)
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasColumnName("interests");

                entity.Property(e => e.Language)
                    .HasMaxLength(1000)
                    .IsUnicode(false)
                    .HasColumnName("language");

                entity.Property(e => e.LookingFor)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("looking_for");

                entity.Property(e => e.MaritalStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("marital_status");

                entity.Property(e => e.Occupation)
                    .HasMaxLength(1000)
                    .IsUnicode(false)
                    .HasColumnName("occupation");

                entity.Property(e => e.PhotoCount).HasColumnName("photo_count");

                entity.Property(e => e.Race)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("race");

                entity.Property(e => e.Religion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("religion");

                entity.Property(e => e.SeekGender)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("seek_gender");

                entity.Property(e => e.SexualOrientation)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("sexual_orientation");

                entity.Property(e => e.Smoke)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("smoke");

                entity.Property(e => e.State)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("state");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.WantChildren)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("want_children");

                entity.Property(e => e.Zip)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("zip");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.City).HasMaxLength(50);

                entity.Property(e => e.Country).HasMaxLength(50);

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(7);

                entity.Property(e => e.LastActive).HasColumnType("datetime");

                entity.Property(e => e.Username).HasMaxLength(50);
            });

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
