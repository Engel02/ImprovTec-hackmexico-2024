using ImprovTec.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace ImprovTec.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult navigator()
        {
            return View();
        }

        public IActionResult home()
        {
            return View();
        }

        public IActionResult imagenes()
        {
            return View();
        }

        public IActionResult historia()
        {
            return View();
        }

        public IActionResult guides()
        {
            return View();
        }

        public IActionResult guias()
        {
            return View();
        }

        public IActionResult maps()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
