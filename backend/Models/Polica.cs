using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Polica")]
    public class Polica
    {
        [Key]
        [Column("policaID")]
        public int policaID { get; set; }

        [Column("nazivPolice")]
        [MaxLength(50)]
        [DataType(DataType.Text)]
        public string nazivPolice { get; set; }

        [Column("opisPolice")]
        [MaxLength(255)]
        [DataType(DataType.Text)]
        public string opisPolice { get; set; }

        [Column("kapacitet")]
        public int kapacitet { get; set; }

        [Column("tren")]
        public int tren { get; set; }
        
        public virtual List<Buket> buketiNaPolici {get; set; }
    }
}