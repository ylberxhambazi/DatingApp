﻿using ChatrDate.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ChatrDate.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AddaptAppDatingAPIContext _context;
        public AuthRepository(AddaptAppDatingAPIContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == username) ?? await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == username);

            if (user == null)
                return null;

            // if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            //     return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            // user.PasswordHash = passwordHash;
            // user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private async Task<string> GetCityFromIpAsync()
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync("https://freegeoip.app/json/");

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResult = await response.Content.ReadAsStringAsync();
                        dynamic resultObject = Newtonsoft.Json.JsonConvert.DeserializeObject(jsonResult);

                        // Extract the city or relevant location information from the resultObject
                        string city = resultObject.city;

                        if (!string.IsNullOrEmpty(city))
                        {
                            return city;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions (log, return a default value, etc.)
                Console.WriteLine($"Exception: {ex.Message}");
            }

            return "Unknown";
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == username))
                return true;

            return false;
        }
    }
}
