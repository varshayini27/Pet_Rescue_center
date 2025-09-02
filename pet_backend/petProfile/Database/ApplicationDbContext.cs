using Microsoft.EntityFrameworkCore;
using petProfile.Model.Entities;

namespace petProfile.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // DbSets (Tables)
        public DbSet<User> Users { get; set; }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<RescueCenter> RescueCenters { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Report> Reports { get; set; } // For stray animal reporting

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // One-to-Many: A Rescue Center has many Pets
            modelBuilder.Entity<Pet>()
                .HasOne(p => p.RescueCenter)
                .WithMany(rc => rc.Pets)
                .HasForeignKey(p => p.rescue_center_id)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many: A User can make many Donations
            modelBuilder.Entity<Donation>()
                .HasOne(d => d.User)
                .WithMany(u => u.Donations)
                .HasForeignKey(d => d.user_id)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many: A Rescue Center can receive many Donations
            modelBuilder.Entity<Donation>()
                .HasOne(d => d.RescueCenter)
                .WithMany(rc => rc.Donations)
                .HasForeignKey(d => d.rescue_center_id)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many: A User can report multiple stray animals
            modelBuilder.Entity<Report>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.user_id)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many: A Rescue Center receives reports for stray animals
            modelBuilder.Entity<Report>()
                .HasOne(r => r.RescueCenter)
                .WithMany(rc => rc.Reports)
                .HasForeignKey(r => r.rescue_center_id)
                .OnDelete(DeleteBehavior.Restrict); // Prevent auto-delete of reports if RC deleted
        }
    }
}
