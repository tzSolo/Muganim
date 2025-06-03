using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeFilesAndSharedFilesNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileUser_Files_FilesId",
                table: "FileUser");

            migrationBuilder.RenameColumn(
                name: "SharedFiles",
                table: "Users",
                newName: "Files");

            migrationBuilder.RenameColumn(
                name: "FilesId",
                table: "FileUser",
                newName: "SharedFilesId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileUser_Files_SharedFilesId",
                table: "FileUser",
                column: "SharedFilesId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileUser_Files_SharedFilesId",
                table: "FileUser");

            migrationBuilder.RenameColumn(
                name: "Files",
                table: "Users",
                newName: "SharedFiles");

            migrationBuilder.RenameColumn(
                name: "SharedFilesId",
                table: "FileUser",
                newName: "FilesId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileUser_Files_FilesId",
                table: "FileUser",
                column: "FilesId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
