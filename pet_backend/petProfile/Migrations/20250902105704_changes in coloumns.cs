using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace petProfile.Migrations
{
    /// <inheritdoc />
    public partial class changesincoloumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "history",
                table: "RescueCenters",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "image_url",
                table: "RescueCenters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "image_url",
                table: "Pets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "history",
                table: "RescueCenters");

            migrationBuilder.DropColumn(
                name: "image_url",
                table: "RescueCenters");

            migrationBuilder.DropColumn(
                name: "image_url",
                table: "Pets");
        }
    }
}
