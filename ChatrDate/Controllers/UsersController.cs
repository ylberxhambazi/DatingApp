using AutoMapper;
using ChatrDate.Data;
using ChatrDate.Dtos;
using ChatrDate.Helpers;
using ChatrDate.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ChatrDate.Controllers
{
    [Authorize(Roles = "Admin, Moderator, Member")]
    [ServiceFilter(typeof(LogUserActivity))]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAddaptDating _repo;
        private readonly IMapper _mapper;
        public UsersController(IAddaptDating repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId, true);
            userParams.UserId = currentUserId;
            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            // userParams.City = string.IsNullOrEmpty(userParams.City)
            //     ? userFromRepo.City
            //     : userParams.City;

            var users = await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(usersToReturn);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;
            var user = await _repo.GetUser(id, isCurrentUser);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            try
            {
                if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                    return Unauthorized();

                var userFromRepo = await _repo.GetUser(id, true);
                _mapper.Map(userForUpdateDto, userFromRepo);

                if (await _repo.SaveAll())
                    return NoContent();
                else
                    return StatusCode(500, "Updating user failed. Check for duplicate values.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating user: {ex.Message}");
            }
        }
        // POST api/UserController/Like
        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var like = await _repo.GetLike(id, recipientId);

            // Check if the like record already exists
            if (like != null)
            {
                // Toggle the IsActive status
                like.IsActive = !like.IsActive;

                // Save changes to the database
                if (await _repo.GetUser(recipientId, false) != null && await _repo.SaveAll())
                    return Ok();
            }

            // Check if the recipient user exists
            if (await _repo.GetUser(recipientId, false) == null)
                return NotFound();

            // Create a new like record
            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId,
                IsActive = true,
                LikedAt = DateTime.Now // Assuming you want to record the timestamp when liked
            };

            _repo.Add<Like>(like);

            // Save changes to the database
            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to like user");
        }


        // POST api.UserController/Visitor
        [HttpPost("{id}/visitor/{recipientVisitorId}")]
        public async Task<IActionResult> Visitors(int id, int recipientVisitorId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Check if the visitor record already exists
            var visitor = await _repo.GetVisitors(id, recipientVisitorId);

            if (visitor != null)
            {
                // Visitor record already exists, no need to update or count visits
                return Ok();
            }

            // Check if the recipient visitor exists
            if (await _repo.GetUser(recipientVisitorId, false) == null)
                return NotFound();

            // Create a new visitor record
            visitor = new Visitors
            {
                UserId = id,
                VisitoredUserId = recipientVisitorId,
                VisitTime = DateTime.Now
            };

            // Add the visitor record to the repository
            _repo.Add<Visitors>(visitor);

            // Save changes to the database
            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to visit user");
        }


        // POST api.UserController/Favorites
        [HttpPost("{id}/favorite/{recipientFavoriteId}")]
        public async Task<IActionResult> Favorites(int id, int recipientFavoriteId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var favorites = await _repo.GetFavorites(id, recipientFavoriteId);

            // Check if the favorite record already exists
            if (favorites != null)
            {
                // Toggle the FavoriteActive status
                favorites.FavoriteActive = !favorites.FavoriteActive;

                // Save changes to the database
                if (await _repo.GetUser(recipientFavoriteId, false) != null && await _repo.SaveAll())
                    return Ok();
            }

            // Check if the recipient user exists
            if (await _repo.GetUser(recipientFavoriteId, false) == null)
                return NotFound();

            // Create a new favorite record
            favorites = new Favorites
            {
                UserId = id,
                FavoritedUserId = recipientFavoriteId,
                FavoriteActive = true,
                FavoritedAt = DateTime.Now // Assuming you want to record the timestamp when favorited
            };
            _repo.Add<Favorites>(favorites);

            // Save changes to the database
            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to add favorite for this user");
        }

        [HttpGet("{id}/favorite")]
        public async Task<bool> IsFavoritedBy(int userId)
        {
            return await _repo.CheckFavorites(userId);
        }
    }
}
