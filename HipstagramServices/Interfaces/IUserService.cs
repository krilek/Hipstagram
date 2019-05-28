namespace HipstagramServices.Interfaces
{
    using System.Collections.Generic;

    using HipstagramRepository.Models;

    public interface IUserService
    {
        User Authenticate(string username, string password);

        User Create(User user, string password);

        IEnumerable<User> GetAll();

        User GetUser(int id);

        void EditUser(User user, string password);
    }
}