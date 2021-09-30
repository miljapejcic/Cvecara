using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("Cvet")]
    public class Cvet
    {
        [Key]
        [Column("cvetID")]
        public int cvetID { get; set; }

        [Column("nazivCveta")]
        [MaxLength(50)]
        public string nazivCveta { get; set; }

        [Column("cenaCveta")]
        public int cenaCveta { get; set; }

        [Column("kolicinaCveta")]
        public int kolicinaCveta { get; set; }

        [Column("bojaCveta")]
        public string bojaCveta { get; set; }

        [JsonIgnore]
        public virtual IList<PripadaBuketu> PripadaBuketima { get; set; }
    }
}