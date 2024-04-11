﻿using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using webapp.Server.Data;
using webapp.Server.Models;
using Azure.Storage.Blobs;
using Azure.Storage;
using Azure.Storage.Blobs.Models;


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

        public async Task<string> UploadImage(IFormFile file, string username)
        {

            BlobContainerClient containerClient = new BlobContainerClient("DefaultEndpointsProtocol=https;AccountName=csce590groupprojecta025;AccountKey=u1odYYKBEwwEuCi0IDVtO9knOfq1DVeYYhGmOHkewr/clSu0RkuDNwGiGXu3tlmA/3nOsZW4JusP+AStNta7Sw==;EndpointSuffix=core.windows.net", "profile-pics");

            await containerClient.CreateIfNotExistsAsync();
            BlobClient blobClient = containerClient.GetBlobClient(username + ".jpg");
            BlobHttpHeaders httpHeaders = new BlobHttpHeaders()
            {
                ContentType = file.ContentType
            };

            await blobClient.UploadAsync(file.OpenReadStream(), httpHeaders);

            return "OK";
        }




    }
}