using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Xml.Serialization;

namespace PageManager
{
    public partial class FileUriCollection
    {
        /// <summary>
        /// A wrapper list for the string values of <seealso cref="FileUriCollection"/> elements.
        /// </summary>
        public class UriStrings : IList<string>, IList
        {
            /// <summary>
            /// The <seealso cref="FileUriCollection"/> wrapped by this list.
            /// </summary>
            [XmlIgnore]
            public FileUriCollection InnerList { get; }

            /// <summary>
            /// Gets or sets the <seealso cref="FileUri"/> value at the specified index in the <seealso cref="InnerList"/>, using its string representation.
            /// </summary>
            /// <param name="index">The zero-based index of the element to get or set.</param>
            /// <returns>The string value of the <seealso cref="FileUri"/> at the specified index in the <seealso cref="InnerList"/></returns>
            public string this[int index]
            {
                get { return InnerList[index].ToString(); }
                set { InnerList[index] = ExtensionMethods.ConvertToFileUri(value); }
            }

            object IList.this[int index]
            {
                get { return InnerList[index].ToString(); }
                set { InnerList[index] = ExtensionMethods.ConvertToFileUri(value); }
            }

            /// <summary>
            /// The number of items contained in the <seealso cref="InnerList"/>.
            /// </summary>
            public int Count { get { return InnerList.Count; } }

            bool ICollection<string>.IsReadOnly { get { return false; } }

            bool IList.IsReadOnly { get { return false; } }

            bool IList.IsFixedSize { get { return false; } }

            object ICollection.SyncRoot { get { return InnerList.SyncRoot; } }

            bool ICollection.IsSynchronized { get { return true; } }

            /// <summary>
            /// Initializes a new instance of <see cref="UriStrings"/> to represent the string values of elements in a <seealso cref="FileUriCollection"/>.
            /// </summary>
            /// <param name="innerList">The <seealso cref="FileUriCollection"/> to be wrapped by this list.</param>
            /// <remarks>If <paramref name="innerList"/> is null, then a new <seealso cref="FileUriCollection"/> will be created as the <seealso cref="InnerList"/>.</remarks>
            public UriStrings(FileUriCollection innerList) { InnerList = innerList ?? new FileUriCollection(); }

            /// <summary>
            /// Initializes a new instance of <see cref="UriStrings"/>, populated with URI values.
            /// </summary>
            /// <param name="list">The string values that are used to populate the <seealso cref="InnerList"/>.</param>
            public UriStrings(params string[] list) : this((IEnumerable<string>)list) { }

            /// <summary>
            /// Initializes a new instance of <see cref="UriStrings"/>, populated with URI values.
            /// </summary>
            /// <param name="collection">The string values that are used to populate the <seealso cref="InnerList"/>.</param>
            public UriStrings(IEnumerable<string> collection)
                : this()
            {
                if (collection == null)
                    return;
                foreach (string s in collection)
                    Add(s);
            }

            /// <summary>
            /// Initializes a new instance of <see cref="UriStrings"/>.
            /// </summary>
            public UriStrings() { InnerList = new FileUriCollection(); }

            public void Add(string item) { InnerList.Add(ExtensionMethods.ConvertToFileUri(item, "item")); }

            int IList.Add(object value) { return InnerList.Add(value); }

            public void Clear() { InnerList.Clear(); }

            public bool Contains(string item) { return item != null && InnerList.Any(u => u.ToString() == item); }

            bool IList.Contains(object value) { return ExtensionMethods.TryConvertToFileUri(value, out FileUri result) && InnerList.Contains(result); }

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

            int IList.IndexOf(object value) { return (ExtensionMethods.TryConvertToString(value, out string result)) ? IndexOf(result) : -1; }

            public void Insert(int index, string item) { InnerList.Insert(index, ExtensionMethods.ConvertToFileUri(item, "item")); }

            void IList.Insert(int index, object value) { InnerList.Insert(index, ExtensionMethods.ConvertToFileUri(value)); }

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
                if (ExtensionMethods.TryConvertToFileUri(value, out FileUri result))
                    InnerList.Remove(result);
            }

            public void RemoveAt(int index) { InnerList.RemoveAt(index); }
        }
    }
}
