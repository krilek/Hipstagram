namespace Hipstagram
{
    using System.IO;

    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;

    using Serilog;

    public class Program
    {
        private static string _environmentName;

        public static IWebHostBuilder BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args).ConfigureLogging(
                (hostingContext, config) =>
                    {
                        config.ClearProviders();
                        _environmentName = hostingContext.HostingEnvironment.EnvironmentName;
                    }).UseStartup<Startup>().UseSerilog(
                (hostingContext, loggerConfiguration) =>
                    loggerConfiguration.ReadFrom.Configuration(hostingContext.Configuration));

        public static void Main(string[] args)
        {
            BuildWebHost(args).Build();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{_environmentName}.json", optional: true, reloadOnChange: true)
                .Build();
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            webHost.Run();
        }
    }
}