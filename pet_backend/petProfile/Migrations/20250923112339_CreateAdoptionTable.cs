using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace petProfile.Migrations
{
    /// <inheritdoc />
    public partial class CreateAdoptionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Adoptions",
                columns: table => new
                {
                    adoption_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    pet_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    full_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    request_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adoptions", x => x.adoption_id);
                    table.ForeignKey(
                        name: "FK_Adoptions_Pets_pet_id",
                        column: x => x.pet_id,
                        principalTable: "Pets",
                        principalColumn: "pet_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Adoptions_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Adoptions_pet_id",
                table: "Adoptions",
                column: "pet_id");

            migrationBuilder.CreateIndex(
                name: "IX_Adoptions_user_id",
                table: "Adoptions",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Adoptions");
        }
    }
}
