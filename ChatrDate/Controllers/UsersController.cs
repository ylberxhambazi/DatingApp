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
    // [Authorize(Roles = "Admin, Moderator, Member")]
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
            var remoteIPAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id, true);
            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }
        // POST api/UserController/Like
        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var like = await _repo.GetLike(id, recipientId);

            if (like != null)
                return BadRequest("You already like this user");
            if (await _repo.GetUser(recipientId, false) == null)
                return NotFound();

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            _repo.Add<Like>(like);

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

            var visitor = await _repo.GetVisitors(id, recipientVisitorId);

            if (visitor != null)
            {
                visitor.VisitorCount++;
                if (await _repo.SaveAll())
                    return Ok();
            }
            if (await _repo.GetUser(recipientVisitorId, false) == null)
                return NotFound();

            visitor = new Visitors
            {
                UserId = id,
                VisitorId = recipientVisitorId
            };
            visitor.VisitorCount++;
            _repo.Add<Visitors>(visitor);

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

            if (favorites != null)
            {
                if (favorites.FavoriteActive != true)
                {
                    favorites.FavoriteActive = true;
                    if (await _repo.GetUser(recipientFavoriteId, false) != null && await _repo.SaveAll())
                        return Ok();
                }
                if (favorites.FavoriteActive != false)
                {
                    favorites.FavoriteActive = false;
                    if (await _repo.GetUser(recipientFavoriteId, false) != null && await _repo.SaveAll())
                        return Ok();
                }
            }

            if (await _repo.GetUser(recipientFavoriteId, false) == null)
                return NotFound();

            favorites = new Favorites
            {
                UserId = id,
                FavoriteId = recipientFavoriteId,
                FavoriteActive = true
            };
            _repo.Add<Favorites>(favorites);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to add favrite this user");
        }
    }
}
