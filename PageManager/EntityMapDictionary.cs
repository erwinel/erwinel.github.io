using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Resolvers;
using System.Xml.Schema;

namespace PageManager
{
    public class EntityMapDictionary : ReadOnlyDictionary<char, string>
    {
        public const string DtdURI_Xhtml_Strict = "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd";
        public const string DtdURI_Xhtml_Transitional = "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd";
        public const string DtdURI_Xhtml_Frameset = "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd";
        public const string DtdURI_Xhtml_Lat1 = "http://www.w3.org/TR/xhtml1/DTD/xhtml-lat1.ent";
        public const string DtdURI_Xhtml_HtmlSymbol = "http://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent";
        public const string DtdURI_Xhtml_HtmlSpecial = "http://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent";

        public static EntityMapDictionary Default { get; } = new EntityMapDictionary();

        public EntityMapDictionary() : base(CreateDictionary()) { }

        public static Dictionary<char, string> CreateDictionary()
        {
            using (StringReader stringReader = new StringReader("<!DOCTYPE html SYSTEM \"" + DtdURI_Xhtml_Transitional + "\" [ ]><html />"))
            {
                using (XmlReader xmlReader = XmlReader.Create(stringReader, new XmlReaderSettings
                {
                    Async = false,
                    CheckCharacters = false,
                    DtdProcessing = DtdProcessing.Parse,
                    XmlResolver = new XmlPreloadedResolver(XmlKnownDtds.Xhtml10),
                    ValidationType = ValidationType.None,
                    ValidationFlags = XmlSchemaValidationFlags.AllowXmlAttributes | XmlSchemaValidationFlags.ProcessIdentityConstraints | XmlSchemaValidationFlags.ProcessInlineSchema
                }))
                {
                    XmlDocument dtd = new XmlDocument();
                    dtd.Load(xmlReader);
                    return CreateDictionary(dtd.DocumentType.Entities.Cast<XmlEntity>());
                }
            }
        }

        public static Dictionary<char, string> CreateDictionary(IEnumerable<XmlEntity> collection)
        {
            Dictionary<char, string> result = new Dictionary<char, string>();
            foreach (XmlEntity entity in collection)
            {
                char c;
                try
                {
                    if (entity.InnerText.Length != 1)
                        continue;
                    c = entity.InnerText[0];
                }
                catch { continue; }
                if ((c < ' ' || c > '~') && !result.ContainsKey(c))
                    result.Add(c, entity.Name);
            }
            return result;
        }
    }
}