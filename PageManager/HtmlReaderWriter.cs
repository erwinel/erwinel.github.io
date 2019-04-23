using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml;
using System.Xml.Resolvers;
using System.Xml.Serialization;

namespace PageManager
{
    public class HtmlReaderWriter
    {
        public string BasePath { get; }

        public CssClassNameCollection PageHeadingClass { get; set; }

        public HtmlReaderWriter(string basePath)
        {
            if (basePath == null)
                throw new ArgumentNullException(basePath);
            try { basePath = Path.GetFullPath(basePath); }
            catch (Exception exc) { throw new ArgumentOutOfRangeException("basePath", (string.IsNullOrWhiteSpace(exc.Message)) ? "Invalid path string" : exc.Message); }
            if (string.IsNullOrEmpty(Path.GetFileName(basePath)))
            {
                string s = Path.GetDirectoryName(basePath);
                if (!string.IsNullOrEmpty(s))
                    basePath = s;
            }
            BasePath = basePath;
        }
    }
}