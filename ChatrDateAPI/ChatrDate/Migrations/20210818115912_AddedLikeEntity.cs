using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatrDate.Migrations
{
    public partial class AddedLikeEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    LikerId = table.Column<int>(type: "int", nullable: false),
                    LikeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => new { x.LikerId, x.LikeeId });
                    table.ForeignKey(
                        name: "FK_Likes_Users_LikeeId",
                        column: x => x.LikeeId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Likes_Users_LikerId",
                        column: x => x.LikerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_LikeeId",
                table: "Likes",
                column: "LikeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_UserId",
                table: "Photos",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "country",
                table: "Samples",
                column: "country");

            migrationBuilder.CreateIndex(
                name: "email",
                table: "Samples",
                column: "email");

            migrationBuilder.CreateIndex(
                name: "gender",
                table: "Samples",
                column: "gender");

            migrationBuilder.CreateIndex(
                name: "race",
                table: "Samples",
                column: "race");

            migrationBuilder.CreateIndex(
                name: "state",
                table: "Samples",
                column: "state");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Likes");
        }
    }
}
