using System;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Logging;

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
		///		The logger for the partial views controller.
		/// </summary>
		readonly ILogger _logger;

		/// <summary>
		///		Create a new partial views controller.
		/// </summary>
		/// <param name="loggerFactory">
		///		The system logger factory.
		/// </param>
		public PartialsController(ILoggerFactory loggerFactory)
		{
			if (loggerFactory == null)
				throw new ArgumentNullException("loggerFactory");

			_logger = loggerFactory.CreateLogger("Partial Views Controller");
		}

		/// <summary>
		///		Render the "index1" partial.
		/// </summary>
		/// <returns>
		///		An action result that renders the partial.
		/// </returns>
		[Route("state1")]
        public IActionResult State1()
        {
			_logger.LogInformation("Serving view for {StateName}.", "state 1");

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
			_logger.LogInformation("Serving view for {StateName}.", "state 2");

			return View();
		}
	}
}
