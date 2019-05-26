namespace Hipstagram.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using HipstagramRepository;
    using HipstagramRepository.Models.Dto;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly HipstagramContext _context;

        public LogsController(HipstagramContext context)
        {
            this._context = context;
        }

        // GET: api/Logs
        [HttpGet]
        public ActionResult<IEnumerable<LogDto>> GetLogs()
        {
            return this._context.Logs.Include(l => l.User).ToList().Select(
                x => new LogDto { Activity = x.Activity, User = x.User.Login, Date = x.Date }).ToList();
        }
    }
}