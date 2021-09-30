using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Polica",
                columns: table => new
                {
                    policaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nazivPolice = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    opisPolice = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    kapacitet = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polica", x => x.policaID);
                });

            migrationBuilder.CreateTable(
                name: "Buket",
                columns: table => new
                {
                    buketID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nazivBuketa = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    cenaBuketa = table.Column<int>(type: "int", nullable: false),
                    policaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buket", x => x.buketID);
                    table.ForeignKey(
                        name: "FK_Buket_Polica_policaID",
                        column: x => x.policaID,
                        principalTable: "Polica",
                        principalColumn: "policaID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cvet",
                columns: table => new
                {
                    cvetID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nazivCveta = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    cenaCveta = table.Column<int>(type: "int", nullable: false),
                    kolicinaCveta = table.Column<int>(type: "int", nullable: false),
                    bojaCveta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    buketID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cvet", x => x.cvetID);
                    table.ForeignKey(
                        name: "FK_Cvet_Buket_buketID",
                        column: x => x.buketID,
                        principalTable: "Buket",
                        principalColumn: "buketID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PripadaBuketu",
                columns: table => new
                {
                    buketID = table.Column<int>(type: "int", nullable: false),
                    cvetID = table.Column<int>(type: "int", nullable: false),
                    kolicina = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PripadaBuketu", x => new { x.buketID, x.cvetID });
                    table.ForeignKey(
                        name: "FK_PripadaBuketu_Buket_buketID",
                        column: x => x.buketID,
                        principalTable: "Buket",
                        principalColumn: "buketID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PripadaBuketu_Cvet_cvetID",
                        column: x => x.cvetID,
                        principalTable: "Cvet",
                        principalColumn: "cvetID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Buket_policaID",
                table: "Buket",
                column: "policaID");

            migrationBuilder.CreateIndex(
                name: "IX_Cvet_buketID",
                table: "Cvet",
                column: "buketID");

            migrationBuilder.CreateIndex(
                name: "IX_PripadaBuketu_cvetID",
                table: "PripadaBuketu",
                column: "cvetID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PripadaBuketu");

            migrationBuilder.DropTable(
                name: "Cvet");

            migrationBuilder.DropTable(
                name: "Buket");

            migrationBuilder.DropTable(
                name: "Polica");
        }
    }
}
