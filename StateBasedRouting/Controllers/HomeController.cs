using Microsoft.AspNet.Mvc;

namespace StateBasedRouting.Controllers
{
	/// <summary>
	///		The default ("Home") controller.
	/// </summary>
	[Route("")]
    public class HomeController
		: Controller
    {
		/// <summary>
		///		Display the main "Index" view.
		/// </summary>
		/// <returns>
		///		An action result that renders the view.
		/// </returns>
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
