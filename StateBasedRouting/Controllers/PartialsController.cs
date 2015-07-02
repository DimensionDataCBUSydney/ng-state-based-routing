using System;
using Microsoft.AspNet.Mvc;

namespace StateBasedRouting.Controllers
{
	/// <summary>
	///		Controller for rendering Angular partial views.
	/// </summary>
	[Route("partials")]
    public class PartialsController
		: Controller
    {
        /// <summary>
		///		Render the "index1" partial.
		/// </summary>
		/// <returns>
		///		An action result that renders the partial.
		/// </returns>
		[Route("state1")]
        public IActionResult State1()
        {
			return View();
        }

		/// <summary>
		///		Render the "state2" partial.
		/// </summary>
		/// <returns>
		///		An action result that renders the partial.
		/// </returns>
		[Route("state2")]
		public IActionResult State2()
		{
			return View();
		}
	}
}
