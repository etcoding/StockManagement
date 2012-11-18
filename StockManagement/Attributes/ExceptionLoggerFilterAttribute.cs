using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace StockManagement.Attributes
{
    /// <summary>
    /// Logs exception and request data using NLog
    /// </summary>
    public class ExceptionLoggerFilterAttribute : ExceptionFilterAttribute
    {
        private static readonly Logger logger = LogManager.GetCurrentClassLogger();

        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            try
            {
                string message =
                "Controller: " + actionExecutedContext.ActionContext.ControllerContext.Controller.GetType() + ";" + Environment.NewLine +
                "Action: " + actionExecutedContext.ActionContext.ActionDescriptor.ActionName + ";" + Environment.NewLine +
                "Action arguments: " + Newtonsoft.Json.JsonConvert.SerializeObject(actionExecutedContext.ActionContext.ActionArguments) + ";" + Environment.NewLine +
                "Headers: " + Newtonsoft.Json.JsonConvert.SerializeObject(actionExecutedContext.Request.Headers) + ";" + Environment.NewLine +
                "URI: " + actionExecutedContext.Request.RequestUri.ToString() + ";" + Environment.NewLine +
                "Exception: " + actionExecutedContext.Exception.ToString();
                logger.Error(message);
            }
            catch (Exception ex)
            {
                logger.WarnException("Failed to log error message; Original exception follows", ex);
                logger.ErrorException("Failure detected.", actionExecutedContext.Exception);
            }


            base.OnException(actionExecutedContext);
        }
    }
}