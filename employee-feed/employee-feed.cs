using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

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
        public async Task Run([BlobTrigger("employee-feed/{name}", Connection = "csce590groupprojecta025_STORAGE")] Stream stream, string name)
        {
            using var blobStreamReader = new StreamReader(stream);
            var content = await blobStreamReader.ReadToEndAsync();
            _logger.LogInformation($"C# Blob trigger function Processed blob\n Name: {name} \n Data: {content}");
        }
    }
}
