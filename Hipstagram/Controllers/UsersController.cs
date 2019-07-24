namespace Hipstagram.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using HipstagramRepository;
    using HipstagramRepository.Models;

    using HipstagramServices.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly HipstagramContext _context;

        private readonly IMapper _mapper;

        private readonly IUserService _userService;

        public UsersController(HipstagramContext context, IUserService userService, IMapper mapper)
        {
            this._mapper = mapper;
            this._userService = userService;
            this._context = context;
        }

        // [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserDto userDto)
        {
            var user = this._userService.Authenticate(userDto.Login, userDto.Password);

            if (user == null)
                return this.BadRequest(new { message = "Username or password is incorrect" });

            return this.Ok(this._mapper.Map<UserDto>(user));
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await this._context.Users.FindAsync(id);
            if (user == null)
            {
                return this.NotFound();
            }

            this._context.Users.Remove(user);
            await this._context.SaveChangesAsync();

            return user;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await this._context.Users.FindAsync(id);

            if (user == null)
            {
                return this.NotFound();
            }

            return user;
        }

        // https://stackoverflow.com/questions/30701006/how-to-get-the-current-logged-in-user-id-in-asp-net-core
        // var x = User.FindFirst(ClaimTypes.NameIdentifier).Value; - to get user id
        // GET: api/Users
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await this._context.Users.ToListAsync();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            this._context.Users.Add(user);
            await this._context.SaveChangesAsync();

            return this.CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserDto user)
        {
            if (id != user.Id)
            {
                return this.BadRequest();
            }

            try
            {
                this._userService.EditUser(this._mapper.Map<User>(user), user.Password);
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return this.BadRequest(new { message = ex.Message });
            }

            return this.Ok();
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            // map dto to entity
            var user = this._mapper.Map<User>(userDto);

            try
            {
                // save 
                this._userService.Create(user, userDto.Password);
                return this.Ok();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return this.BadRequest(new { message = ex.Message });
            }
        }

        private bool UserExists(int id)
        {
            return this._context.Users.Any(e => e.Id == id);
        }
    }
}