using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class CvecaraContext : DbContext
    {
        public DbSet<Polica> Police { get; set; }
        public DbSet<Buket> Buketi {get ; set; }
        public DbSet<Cvet> Cvetovi {get; set; }
        public DbSet<PripadaBuketu> PripadaBuketu { get; set; }

        public CvecaraContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PripadaBuketu>()
            .HasKey(ck => new 
            {
                ck.buketID,ck.cvetID
            });

            modelBuilder.Entity<Polica>()
            .HasMany(b => b.buketiNaPolici)
            .WithOne(p =>p.polica)
            .HasForeignKey(p=>p.policaID)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }


}