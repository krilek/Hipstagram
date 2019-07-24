namespace HipstagramServices
{
    #region Usings

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Text;

    using HipstagramRepository;
    using HipstagramRepository.Models;

    using HipstagramServices.Interfaces;

    using Microsoft.EntityFrameworkCore;

    #endregion

    public class UserService : IUserService
    {
        private readonly HipstagramContext _context;

        public UserService(HipstagramContext context)
        {
            this._context = context;
        }

        public User Authenticate(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                return null;

            var user = this._context.Users.SingleOrDefault(x => x.Login == login);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // Add info to log
            // Will be fixed in a future
            // this._context.Logs.Add(new Log { Activity = "Signed in.", Date = DateTime.Now, User = user });

            // authentication successful
            return user;
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (this._context.Users.Any(x => x.Login == user.Login))
                throw new Exception($"Login \"{user.Login}\" is already taken");

            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            this._context.Users.Add(user);

            // Add info to log
            this._context.Logs.Add(new Log { Activity = "Registered new user.", Date = DateTime.Now, User = user });
            this._context.SaveChanges();

            return user;
        }

        public void EditUser(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");
            User userToEdit = this._context.Users.Find(user.Id);
            if (userToEdit == null)
                throw new Exception("Specified user to edit doesn't exist");
            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);
            userToEdit.Email = user.Email;
            userToEdit.Login = user.Login;
            userToEdit.isAdmin = user.isAdmin;
            userToEdit.PasswordHash = passwordHash;
            userToEdit.PasswordSalt = passwordSalt;
            this._context.Entry(userToEdit).State = EntityState.Modified;
            this._context.Logs.Add(
                new Log { Activity = $"Edited user {userToEdit.Login}.", Date = DateTime.Now, User = user });
            this._context.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            return this._context.Users;
        }

        public User GetUser(int id)
        {
            return this._context.Users.FirstOrDefault(user => user.Id == id);
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));

            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            if (storedHash.Length != 64)
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));
            if (storedSalt.Length != 128)
                throw new ArgumentException(
                    "Invalid length of password salt (128 bytes expected).",
                    nameof(storedSalt));

            using (var hmac = new HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (var i = 0; i < computedHash.Length; i++)
                    if (computedHash[i] != storedHash[i])
                        return false;
            }

            return true;
        }
    }
}