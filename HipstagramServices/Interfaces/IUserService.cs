using HipstagramRepository.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HipstagramServices.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User Create(User user, string password);
        IEnumerable<User> GetAll();
    }
}