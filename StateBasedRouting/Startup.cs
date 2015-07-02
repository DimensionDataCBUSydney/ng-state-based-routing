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
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
	        if (services == null)
		        throw new ArgumentNullException("services");

	        services.AddMvc();
        }

        public void Configure(IApplicationBuilder app)
        {
	        if (app == null)
		        throw new ArgumentNullException("app");

	        app.UseStaticFiles();
	        app.UseMvc();
        }
    }
}
