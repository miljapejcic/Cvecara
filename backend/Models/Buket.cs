using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("Buket")]
    public class Buket
    {
        [Key]
        [Column("buketID")]
        public int buketID { get; set; }

        [Column("nazivBuketa")]
        [MaxLength(50)]
        public string nazivBuketa { get; set; }

        [Column("cenaBuketa")]
        public int cenaBuketa { get; set; }

        [Column("policaID")]
        [Required]
        public int policaID { get; set; }

        [JsonIgnore]
        public Polica polica { get; set; }

        public virtual IList<PripadaBuketu> cvetoviUBuketu {get ; set; }
    }
}