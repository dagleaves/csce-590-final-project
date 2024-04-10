using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using webapp.Server.Data;
using webapp.Server.Models;
using Azure.Storage;

namespace webapp.Server.Services
{
    public class UserService
    {
        private readonly EmployeeContext _employeeContext;

        public UserService(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
        }

        public Task<User> Login(string username, string password)
        {
            var users = _employeeContext.Users.AsEnumerable();

            try
            {
                var findUser = users
                            .Select(user => user)
                            .Where(user => user.Username == username);

                var user = findUser.FirstOrDefault();

                if (user != null && user.Password == password)
                {
                    return Task.FromResult(user);
                }
                else
                {
                    //wrong password
                    return Task.FromException<User>(new InvalidOperationException($"Login/password is incorrect"));
                }
            }
            catch
            {
                throw;
            }
        }

        public Task<User> uploadImage(string url)
        {
            var users = _employeeContext.Users.AsEnumerable();

            try
            {
                if (url != "")
                {
                    var findUser = users
                            .Select(user => user)
                            .Where(user => user.Username == "lijones");

                    var user = findUser.FirstOrDefault();
                    return Task.FromResult(user);
                }
                else
                {
                    return Task.FromException<User>(new InvalidOperationException($"No URL found"));
                }
            }
            catch
            {
                throw;
            }
        }

        public static async Task<bool> UploadProfileImage(Stream fileStream, string fileName,
                                                    AzureStorageConfig _storageConfig)
        {
            // Create a URI to the blob
            Uri blobUri = new Uri("https://" +
                                  _storageConfig.AccountName +
                                  ".blob.core.windows.net/" +
                                  _storageConfig.ImageContainer +
                                  "/" + fileName);

            // Create StorageSharedKeyCredentials object by reading
            // the values from the configuration (appsettings.json)
            StorageSharedKeyCredential storageCredentials =
                new StorageSharedKeyCredential(_storageConfig.AccountName, _storageConfig.AccountKey);

            // Create the blob client.
            BlobClient blobClient = new BlobClient(blobUri, storageCredentials);

            // Upload the file
            await blobClient.UploadAsync(fileStream);

            return await Task.FromResult(true);
        }



    }
}