using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Buket_Polica_policaID",
                table: "Buket");

            migrationBuilder.DropForeignKey(
                name: "FK_Cvet_Buket_buketID",
                table: "Cvet");

            migrationBuilder.DropIndex(
                name: "IX_Cvet_buketID",
                table: "Cvet");

            migrationBuilder.DropColumn(
                name: "buketID",
                table: "Cvet");

            migrationBuilder.AddColumn<int>(
                name: "tren",
                table: "Polica",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "policaID",
                table: "Buket",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Buket_Polica_policaID",
                table: "Buket",
                column: "policaID",
                principalTable: "Polica",
                principalColumn: "policaID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Buket_Polica_policaID",
                table: "Buket");

            migrationBuilder.DropColumn(
                name: "tren",
                table: "Polica");

            migrationBuilder.AddColumn<int>(
                name: "buketID",
                table: "Cvet",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "policaID",
                table: "Buket",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Cvet_buketID",
                table: "Cvet",
                column: "buketID");

            migrationBuilder.AddForeignKey(
                name: "FK_Buket_Polica_policaID",
                table: "Buket",
                column: "policaID",
                principalTable: "Polica",
                principalColumn: "policaID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cvet_Buket_buketID",
                table: "Cvet",
                column: "buketID",
                principalTable: "Buket",
                principalColumn: "buketID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
