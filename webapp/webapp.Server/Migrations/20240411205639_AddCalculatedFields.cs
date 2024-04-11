using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapp.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddCalculatedFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true,
                computedColumnSql: "(([FirstName]+' ')+[LastName])",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiryDate",
                table: "Achievements",
                type: "datetime2",
                nullable: false,
                computedColumnSql: "DATEADD(month, 6, [CertifiedDate])",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldComputedColumnSql: "(([FirstName]+' ')+[LastName])");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiryDate",
                table: "Achievements",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldComputedColumnSql: "DATEADD(month, 6, [CertifiedDate])");
        }
    }
}
