using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.Framework.DependencyInjection;

namespace StateBasedRouting
{
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
        public void Configure(IApplicationBuilder app)
        {
	        if (app == null)
		        throw new ArgumentNullException("app");

	        app.UseStaticFiles();
	        app.UseMvc();
        }
    }
}
