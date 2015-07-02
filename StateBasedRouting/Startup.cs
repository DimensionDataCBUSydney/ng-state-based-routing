using System;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Logging;

namespace StateBasedRouting
{
	/// <summary>
	///		Configuration for the state-based routing demo.
	/// </summary>
    public class Startup
    {
        /// <summary>
		///		Configure services required by the application.
		/// </summary>
		/// <param name="services">
		///		The global application service collection.
		/// </param>
        public void ConfigureServices(IServiceCollection services)
        {
	        if (services == null)
		        throw new ArgumentNullException("services");

	        services.AddMvc();
        }

		/// <summary>
		///		Configure the application pipeline.
		/// </summary>
		/// <param name="app">
		///		The application pipeline builder.
		/// </param>
		/// <param name="loggerFactory">
		///		The system logger factory.
		/// </param>
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
	        if (app == null)
		        throw new ArgumentNullException("app");

			if (loggerFactory == null)
				throw new ArgumentNullException("loggerFactory");

			app.UseStaticFiles();
	        app.UseMvc();

			loggerFactory.AddConsole();
		}
    }
}
