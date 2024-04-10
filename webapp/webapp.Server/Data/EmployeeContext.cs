﻿using Microsoft.EntityFrameworkCore;

namespace webapp.Server.Data
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {
            
        }
        public DbSet<webapp.Server.Models.Employee> Employees { get; set; } 
        public DbSet<webapp.Server.Models.Certificate> Certificates { get; set; }
        public DbSet<webapp.Server.Models.Achievement> Achievements { get; set; }
        public DbSet<webapp.Server.Models.User> Users { get; set; }

    }
}
