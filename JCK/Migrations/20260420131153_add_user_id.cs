using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JCK.Migrations
{
    /// <inheritdoc />
    public partial class add_user_id : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Listings",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Listings");
        }
    }
}
