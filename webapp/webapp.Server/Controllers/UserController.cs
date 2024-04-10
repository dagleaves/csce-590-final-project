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
    public class UserController : ControllerBase
    {
        private readonly EmployeeContext _employeeContext;
        private readonly UserService _usersService;
        private readonly ILogger<UserController> _logger;

        public UserController(EmployeeContext employeeContext, UserService userService, ILogger<UserController> logger)
        {
            _employeeContext = employeeContext;
            _usersService = userService;
            _logger = logger;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_employeeContext.Users == null)
            {
                return NotFound();
            }
            return await _employeeContext.Users.ToListAsync();
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromForm] string username, [FromForm] string password)
        {
            try
            {
                var user = await _usersService.Login(username, password);
                return Ok(user);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost("upload")]
        public async Task<ActionResult<User>> upload([FromBody] string url)
        {
            try
            {
                var user = await _usersService.uploadImage(url);
                return Ok(user);
            }
            catch
            {
                throw;
            }
        }



    }
}
