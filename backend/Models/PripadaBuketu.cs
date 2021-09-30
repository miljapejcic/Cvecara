using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("PripadaBuketu")]
    public class PripadaBuketu
    {
        [Column("buketID")]
        public int buketID { get; set; }

        [JsonIgnore]
        public virtual Buket buket { get; set; }

        [Column("cvetID")]
        public int cvetID { get; set; }

        [JsonIgnore]
        public virtual Cvet cvet { get; set; }

        [Column("kolicina")]
        public int kolicina { get; set; }
    }
}