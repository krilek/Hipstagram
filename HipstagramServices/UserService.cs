using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HipstagramRepository.Models;
using HipstagramServices.Interfaces;

namespace HipstagramServices
{
    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users = new List<User>
        {
            new User { Id = 1, Login = "test", Password = "test" }
        };

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await Task.Run(() => _users.SingleOrDefault(x => x.Login == username && x.Password == password));

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so return user details without password
            user.Password = null;
            return user;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            // return users without passwords
            return await Task.Run(() => _users.Select(x => {
                x.Password = null;
                return x;
            }));
        }

        public async Task<User> Register(User user)
        {
            return new User();
            //    _context.Users.Add(user);
            //    await _context.SaveChangesAsync();
            //    return user;
        }
    }
}