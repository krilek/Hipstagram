using HipstagramRepository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HipstagramServices.Interfaces
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<User> Register(User user);
        Task<IEnumerable<User>> GetAll();
    }
}