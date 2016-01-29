﻿/*
' Copyright (c) 2015  Ralph Williams (RalphWilliams.com)
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using DotNetNuke.Web.Api;

namespace RalphWilliams.Modules.DNNVideoCourse.Models
{
	public class RouteMapper : IServiceRouteMapper
	{
		public void RegisterRoutes(IMapRoute mapRouteManager)
		{
			mapRouteManager.MapHttpRoute("DNNVideoCourse", "default", "{controller}/{action}", new[] { "RalphWilliams.Modules.DNNVideoCourse.Models" });
		}
	}
}