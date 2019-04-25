using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Text.RegularExpressions;
using System.Threading;

namespace PageManager
{
    public class CssClassNameCollection : IList<string>, IList, IEquatable<CssClassNameCollection>, IEquatable<IEnumerable<string>>, IEquatable<string>
    {
        public static readonly Regex ClassNameRegex = new Regex(@"^[a-z_][a-z\d_]*$", RegexOptions.IgnoreCase | RegexOptions.Compiled);
        public static readonly Regex WhitespaceRegex = new Regex(@"\s+", RegexOptions.Compiled);

        private List<string> _innerList = new List<string>();

        public string this[int index]
        {
            get { return _innerList[index]; }
            set
            {
                string item;
                if (value == null || (item = value.Trim()).Length == 0)
                    _innerList.RemoveAt(index);
                else
                {
                    if (!ClassNameRegex.IsMatch(item))
                        throw new ArgumentOutOfRangeException();
                    Monitor.Enter(SyncRoot);
                    try
                    {
                        int i = IndexOf(item);
                        if (i == index)
                            return;
                        if (i < 0)
                            _innerList.Add(item);
                        else
                        {
                            _innerList[index] = item;
                            _innerList.RemoveAt((i < 0) ? i : i - 1);
                        }
                    }
                    finally { Monitor.Exit(SyncRoot); }
                }
            }
        }

        object IList.this[int index] { get { return _innerList[index]; } set { this[index] = ExtensionMethods.ConvertToString(value); } }

        public int Count { get { return _innerList.Count; } }

        bool ICollection<string>.IsReadOnly { get { return false; } }

        bool IList.IsReadOnly { get { return false; } }

        bool IList.IsFixedSize { get { return false; } }

        public object SyncRoot { get; } = new object();

        bool ICollection.IsSynchronized { get { return true; } }

        public void Add(string item)
        {
            if (item == null || (item = item.Trim()).Length == 0)
                return;
            if (!ClassNameRegex.IsMatch(item))
                throw new ArgumentOutOfRangeException("item");
            Monitor.Enter(SyncRoot);
            try
            {
                if (!_innerList.Contains(item))
                    _innerList.Add(item);
            }
            finally { Monitor.Exit(SyncRoot); }
        }

        int IList.Add(object value)
        {
            string item = ExtensionMethods.ConvertToString(value);
            if (item == null)
                throw new ArgumentNullException("value");
            if ((item = item.Trim()).Length == 0 || !ClassNameRegex.IsMatch(item))
                throw new ArgumentOutOfRangeException("value");
            int index;
            Monitor.Enter(SyncRoot);
            try
            {

                index = _innerList.IndexOf(item);
                if (index < 0)
                {
                    index = _innerList.Count;
                    _innerList.Add(item);
                }
            }
            finally { Monitor.Exit(SyncRoot); }
            return index;
        }

        public void Clear()
        {
            Monitor.Enter(SyncRoot);
            try { _innerList.Clear(); }
            finally { Monitor.Exit(SyncRoot); }
        }

        public bool Contains(string item) { return _innerList.Contains(item); }

        bool IList.Contains(object value) { return ExtensionMethods.TryConvertToString(value, out string item) && Contains(item); }

        public void CopyTo(string[] array, int arrayIndex) { _innerList.CopyTo(array, arrayIndex); }

        void ICollection.CopyTo(Array array, int index) { _innerList.ToArray().CopyTo(array, index); }

#pragma warning disable IDE1006 // Naming Styles
        private bool __Equals(CssClassNameCollection other)
#pragma warning restore IDE1006 // Naming Styles
        {
            return ReferenceEquals(this, other) || _innerList.OrderBy(s => s).SequenceEqual(other._innerList.OrderBy(s => s));
        }

        public bool Equals(CssClassNameCollection other) { return other != null && __Equals(other); }

#pragma warning disable IDE1006 // Naming Styles
        private bool __Equals(IEnumerable<string> other)
#pragma warning restore IDE1006 // Naming Styles
        {
            return _innerList.OrderBy(s => s).SequenceEqual(other.Where(s => s != null).Select(s => s.Trim()).Where(s => s.Length > 0).Distinct().OrderBy(s => s));
        }

        public bool Equals(IEnumerable<string> other)
        {
            if (other == null)
                return false;
            if (other is CssClassNameCollection)
                return __Equals((CssClassNameCollection)other);
            return __Equals(other);
        }

        public bool Equals(string other)
        {
            if (other == null)
                return false;
            if ((other = other.Trim()).Length == 0)
                return _innerList.Count == 0;
            return __Equals(WhitespaceRegex.Split(other));
        }

        public override bool Equals(object obj)
        {
            if (obj == null)
                return false;
            object baseObject = (obj is PSObject) ? ((PSObject)obj).BaseObject : obj;
            if (obj is string)
                return Equals((string)obj);
            if (ExtensionMethods.TryConvertToStringEnumerable(obj, out IEnumerable<string> result))
            {
                if (result is CssClassNameCollection)
                    return __Equals((CssClassNameCollection)result);
                return __Equals(result);
            }
            return false;
        }

        public override int GetHashCode() { return string.Join(" ", _innerList.OrderBy(s => s)).GetHashCode(); }

        public override string ToString() { return string.Join(" ", _innerList); }

        public IEnumerator<string> GetEnumerator() { return _innerList.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }

        public int IndexOf(string item) { return _innerList.IndexOf(item); }

        int IList.IndexOf(object value) { return (ExtensionMethods.TryConvertToString(value, out string item)) ? _innerList.IndexOf(item) : -1; }

        public void Insert(int index, string item)
        {
            if (item == null || (item = item.Trim()).Length == 0)
                return;
            if (!ClassNameRegex.IsMatch(item))
                throw new ArgumentOutOfRangeException("item");
            Monitor.Enter(SyncRoot);
            try
            {
                int i = _innerList.IndexOf(item);
                if (i < 0)
                    _innerList.Insert(index, item);
                else if (i < index)
                {
                    _innerList.Insert(index, item);
                    _innerList.RemoveAt(i);
                }
                else if (i > index + 1)
                {
                    _innerList.Insert(index, item);
                    _innerList.RemoveAt(i + 1);
                }
            }
            finally { Monitor.Exit(SyncRoot); }
        }

        void IList.Insert(int index, object value) { Insert(index, ExtensionMethods.ConvertToString(value)); }

        public bool Remove(string item)
        {
            if (item == null || (item = item.Trim()).Length == 0)
                return false;
            Monitor.Enter(SyncRoot);
            try { return _innerList.Remove(item); }
            finally { Monitor.Exit(SyncRoot); }
        }

        void IList.Remove(object value)
        {
            if (ExtensionMethods.TryConvertToString(value, out string item))
                Remove(item);
        }

        public void RemoveAt(int index)
        {
            Monitor.Enter(SyncRoot);
            try { _innerList.RemoveAt(index); }
            finally { Monitor.Exit(SyncRoot); }
        }
    }
}