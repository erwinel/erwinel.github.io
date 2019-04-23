using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Threading;
using System.Xml.Serialization;

namespace PageManager
{
    public partial class UriCollection
    {
        public class UriStrings : IList<string>, IList
        {
            [XmlIgnore]
            public UriCollection InnerList { get; }

            public string this[int index]
            {
                get { return InnerList[index].ToString(); }
                set { InnerList[index] = FileUri.AsFileUri(value); }
            }

            object IList.this[int index]
            {
                get { return InnerList[index].ToString(); }
                set { InnerList[index] = FileUri.AsFileUri(value); }
            }

            public int Count { get { return InnerList.Count; } }

            bool ICollection<string>.IsReadOnly { get { return false; } }

            bool IList.IsReadOnly { get { return false; } }

            bool IList.IsFixedSize { get { return false; } }

            object ICollection.SyncRoot { get { return InnerList.SyncRoot; } }

            bool ICollection.IsSynchronized { get { return true; } }

            public UriStrings(UriCollection innerList) { InnerList = innerList ?? new UriCollection(); }

            public UriStrings(params string[] list) : this((IEnumerable<string>)list) { }

            public UriStrings(IEnumerable<string> collection)
                : this()
            {
                if (collection == null)
                    return;
                foreach (string s in collection)
                    Add(s);
            }

            public UriStrings() { InnerList = new UriCollection(); }

            public void Add(string item) { InnerList.Add(FileUri.AsFileUri(item, "item")); }

            int IList.Add(object value) { return InnerList.Add(value); }

            #region AsString Methods

            public static bool TryCastAsString(object value, out string result)
            {
                if (value != null)
                {
                    if (value is PSObject)
                        value = ((PSObject)value).BaseObject;
                    if (value is string)
                        result = (string)value;
                    else
                    {
                        result = null;
                        return false;
                    }
                }
                else
                    result = null;
                return true;
            }

            public static string AsString(object value, string paramName)
            {
                try { return (string)((value != null && value is PSObject) ? ((PSObject)value).BaseObject : value); }
                catch (IndexOutOfRangeException) { throw; }
                catch (ArgumentNullException exception)
                {
                    if (string.IsNullOrWhiteSpace(paramName))
                        paramName = "value";
                    if (exception.ParamName != null && exception.ParamName == paramName)
                        throw;
                    if (string.IsNullOrWhiteSpace(exception.Message))
                        throw new ArgumentNullException(paramName);
                    throw new ArgumentNullException(exception.Message, paramName);
                }
                catch (ArgumentOutOfRangeException exception)
                {
                    if (string.IsNullOrWhiteSpace(paramName))
                        paramName = "value";
                    if (exception.ParamName != null && exception.ParamName == paramName)
                        throw;
                    if (string.IsNullOrWhiteSpace(exception.Message))
                        throw new ArgumentOutOfRangeException(paramName);
                    throw new ArgumentOutOfRangeException(exception.Message, paramName);
                }
                catch (ArgumentException exception)
                {
                    if (string.IsNullOrWhiteSpace(paramName))
                        paramName = "value";
                    if (exception.ParamName != null && exception.ParamName == paramName)
                        throw;
                    throw new ArgumentException(exception.Message, paramName, exception);
                }
                catch (InvalidCastException exception) { throw new ArgumentException((string.IsNullOrWhiteSpace(exception.Message)) ? "Invalid type" : exception.Message, (string.IsNullOrWhiteSpace(paramName)) ? "value" : paramName, exception); }
            }

            public static string AsString(object value) { return AsString(value, null); }

            #endregion

            public void Clear() { InnerList.Clear(); }

            public bool Contains(string item) { return item != null && InnerList.Any(u => u.ToString() == item); }

            bool IList.Contains(object value) { return FileUri.TryCastAsFileUri(value, out FileUri result) && InnerList.Contains(result); }

            public void CopyTo(string[] array, int arrayIndex) { InnerList.Select(u => u.ToString()).ToList().CopyTo(array, arrayIndex); }

            void ICollection.CopyTo(Array array, int index) { InnerList.Select(u => u.ToString()).ToArray().CopyTo(array, index); }

            public IEnumerator<string> GetEnumerator() { return InnerList.Select(u => u.ToString()).GetEnumerator(); }

            IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }

            public int IndexOf(string item)
            {
                if (item != null)
                {
                    Monitor.Enter(InnerList.SyncRoot);
                    try
                    {
                        for (int i = 0; i < InnerList.Count; i++)
                        {
                            if (InnerList[i].ToString() == item)
                                return i;
                        }
                    }
                    finally { Monitor.Exit(InnerList.SyncRoot); }
                }
                return -1;
            }

            int IList.IndexOf(object value) { return (TryCastAsString(value, out string result)) ? IndexOf(result) : -1; }

            public void Insert(int index, string item) { InnerList.Insert(index, FileUri.AsFileUri(item, "item")); }

            void IList.Insert(int index, object value) { InnerList.Insert(index, FileUri.AsFileUri(value)); }

            public bool Remove(string item)
            {
                if (item != null)
                {
                    Monitor.Enter(InnerList.SyncRoot);
                    try
                    {
                        for (int i = 0; i < InnerList.Count; i++)
                        {
                            if (InnerList[i].ToString() == item)
                            {
                                InnerList.RemoveAt(i);
                                return true;
                            }
                        }
                    }
                    finally { Monitor.Exit(InnerList.SyncRoot); }
                }
                return false;
            }

            void IList.Remove(object value)
            {
                if (FileUri.TryCastAsFileUri(value, out FileUri result))
                    InnerList.Remove(result);
            }

            public void RemoveAt(int index) { InnerList.RemoveAt(index); }
        }
    }
}
