using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;

namespace CSCE590GroupProject.EmployeeFeed
{
    public class employee_feed
    {
        private readonly ILogger<employee_feed> _logger;

        public employee_feed(ILogger<employee_feed> logger)
        {
            _logger = logger;
        }

        [Function(nameof(employee_feed))]
        [SqlOutput("dbo.Employees", connectionStringSetting: "SqlConnectionString")]
        public async Task<Employee[]> Run([BlobTrigger("employee-feed/{name}", Connection = "csce590groupprojecta025_STORAGE")] Stream stream, string name)
        {
            using var blobStreamReader = new StreamReader(stream);
            _logger.LogInformation($"C# Blob trigger function Processed blob\n Name: {name} \n");
            
            // Skip header
            await blobStreamReader.ReadLineAsync();

            // Start processing employees
            var line = await blobStreamReader.ReadLineAsync();
            List<Employee> employees = new List<Employee>();
            while (line != null)
            {
                var employee = ProcessEmployeeInfo(line);
                employees.Add(employee);
                _logger.LogInformation($"Processed employee info\n Info: {line} \n");
                line = await blobStreamReader.ReadLineAsync();
            }
            return employees.ToArray();
        }
        
        public static Employee ProcessEmployeeInfo(string employeeInfo)
        {
            // Process employee info
            var info = employeeInfo.Split(',');
            if (info.Length != 8)
            {
                throw new InvalidDataException("Invalid employee info");
            }

            // Create new employee
            return new Employee
            {
                ID = int.Parse(info[0]),
                FirstName = info[1],
                LastName = info[2],
                Email = info[3],
                PhoneNumber = info[4],
                Grade = info[5][0],
                Role = info[6],
                Username = info[7],
                UserType = "User"
            };

        }
    }

    public class Employee
    {
        public int ID { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
        public char Grade { get; set; }
        public string? UserType { get; set; }
        public string? Username { get; set; }
    }

}
