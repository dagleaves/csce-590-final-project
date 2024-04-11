// https://www.youtube.com/watch?v=OrHO7UeDwZc
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapp.Server.Data;
using webapp.Server.Models;
using webapp.Server.Services;

namespace webapp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _employeeContext;
        private readonly ILogger<EmployeeController> _logger;
        private readonly UserService _usersService;


        public EmployeeController(EmployeeContext employeeContext, UserService userService, ILogger<EmployeeController> logger)
        {
            _employeeContext = employeeContext;
            _usersService = userService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_employeeContext.Employees == null)
            {
                return NotFound();
            }
            return await _employeeContext.Employees.Include(employee => employee.Achievements).ThenInclude(achievement => achievement.Certificate).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_employeeContext.Employees == null)
            {
                return NotFound();
            }
            var employee = await _employeeContext.Employees.Include(employee => employee.Achievements).ThenInclude(achievement => achievement.Certificate).FirstOrDefaultAsync(employee => employee.ID == id);
            if (employee == null) 
            {
                return NotFound();
            }
            return employee;
        }
    }
}
