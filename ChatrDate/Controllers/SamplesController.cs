using AutoMapper;
using ChatrDate.Data;
using ChatrDate.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ChatrDate.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class SamplesController : ControllerBase
    {
        private readonly IAddaptDating _repo;
        private readonly IMapper _mapper;
        public SamplesController(IAddaptDating repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetSamples()
        {
            var samples = await _repo.GetSamples();
            var usersToReturn = _mapper.Map<IEnumerable<SamplesForListDto>>(samples);
            return Ok(usersToReturn);
        }
        [HttpGet("{id}", Name = "GetSample")]
        public async Task<IActionResult> GetSample(int id)
        {
            var sample = await _repo.GetSample(id);
            var userToReturn = _mapper.Map<SamplesForDetailedDto>(sample);
            return Ok(userToReturn);
        }
    }
}
