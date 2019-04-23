using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Threading;

namespace PageManager
{
    public partial class HtmlPage
    {
        public class Collection : IList<HtmlPage>, IList
        {
            private HtmlPage _parent = null;
            private List<HtmlPage> _innerList = new List<HtmlPage>();

            #region Properties

            public HtmlPage this[int index]
            {
                get { return _innerList[index]; }
                set
                {
                    if (value == null)
                        throw new ArgumentNullException();
                    Monitor.Enter(SyncRoot);
                    try
                    {
                        Monitor.Enter(value.SyncRoot);
                        try
                        {
                            if (_parent != null && (ReferenceEquals(value, _parent) || _parent.IsContainedBy(value)))
                                throw new InvalidOperationException("Cannot created circular hierarchical item references");
                            HtmlPage item = _innerList[index];
                            if (value._parentCollection != null)
                            {
                                if (ReferenceEquals(value._parentCollection, this))
                                {
                                    if (ReferenceEquals(item, value))
                                        return;
                                    Monitor.Enter(item.SyncRoot);
                                    try
                                    {
                                        _innerList.Remove(value);
                                        if (index == _innerList.Count)
                                            _innerList.Add(value);
                                        else
                                            _innerList.Insert(index, value);
                                    }
                                    finally { Monitor.Exit(item.SyncRoot); }
                                    return;
                                }
                                if (!value._parentCollection.Remove(value))
                                    return;
                            }
                            Monitor.Enter(item.SyncRoot);
                            try
                            {
                                item._parentCollection = null;
                                (_innerList[index] = value)._parentCollection = this;
                            }
                            finally { Monitor.Exit(item.SyncRoot); }
                        }
                        finally { Monitor.Exit(value.SyncRoot); }
                    }
                    finally { Monitor.Exit(SyncRoot); }
                }
            }

            object IList.this[int index] { get { return _innerList[index]; } set { this[index] = AsHtmlPage(value); } }

            public int Count { get { return _innerList.Count; } }

            bool IList.IsFixedSize { get { return false; } }

            bool ICollection<HtmlPage>.IsReadOnly { get { return false; } }

            bool IList.IsReadOnly { get { return false; } }

            bool ICollection.IsSynchronized { get { return true; } }

            public HtmlPage Parent
            {
                get { return _parent; }
                set
                {
                    Monitor.Enter(SyncRoot);
                    try
                    {
                        if (value == null)
                        {
                            if (_parent == null)
                                return;
                            Monitor.Enter(_parent.SyncRoot);
                            try
                            {
                                _parent._childPages = null;
                                _parent = null;
                            }
                            finally { Monitor.Exit(_parent.SyncRoot); }
                        }
                        else
                        {
                            Monitor.Enter(value.SyncRoot);
                            try
                            {
                                if (_parent != null)
                                {
                                    if (ReferenceEquals(_parent, value))
                                        return;
                                    if (_parent.IsContainedBy(value))
                                        throw new InvalidOperationException("Cannot created circular hierarchical item references");
                                    Monitor.Enter(_parent.SyncRoot);
                                    try { _parent._childPages.Parent = null; }
                                    finally { Monitor.Exit(_parent.SyncRoot); }
                                }
                                if (value._childPages != null)
                                    value._childPages.Parent = null;
                                (_parent = value)._childPages = this;
                            }
                            finally { Monitor.Exit(value.SyncRoot); }
                        }
                    }
                    finally { Monitor.Exit(SyncRoot); }
                }
            }

            public object SyncRoot { get; } = new object();

            #endregion

            #region Instance Methods

            #region Add Methods

            public void Add(HtmlPage item)
            {
                if (item == null)
                    throw new ArgumentNullException("item");
                Monitor.Enter(SyncRoot);
                try
                {
                    Monitor.Enter(item.SyncRoot);
                    try
                    {
                        if (_parent != null && (ReferenceEquals(item, _parent) || _parent.IsContainedBy(item)))
                            throw new InvalidOperationException("Cannot created circular hierarchical item references");
                        if (item._parentCollection != null)
                        {
                            if (ReferenceEquals(item._parentCollection, this))
                                return;
                            if (!item._parentCollection.Remove(item))
                                throw new ArgumentException("Unable to remove item from its current colleciton");
                        }
                        _innerList.Add(item);
                        item._parentCollection = this;
                    }
                    finally { Monitor.Exit(item.SyncRoot); }
                }
                finally { Monitor.Exit(SyncRoot); }
            }

            int IList.Add(object value)
            {
                int index;
                Monitor.Enter(SyncRoot);
                try
                {
                    index = _innerList.Count;
                    Add(AsHtmlPage(value));
                }
                finally { Monitor.Exit(SyncRoot); }
                return index;
            }

            #endregion

            #region AsHtmlPage Methods

            public static bool TryCastAsHtmlPage(object value, out HtmlPage result)
            {
                if (value != null)
                {
                    if (value is PSObject)
                        value = ((PSObject)value).BaseObject;
                    if (value is HtmlPage)
                        result = (HtmlPage)value;
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

            public static HtmlPage AsHtmlPage(object value, string paramName)
            {
                try { return (HtmlPage)((value != null && value is PSObject) ? ((PSObject)value).BaseObject : value); }
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

            public static HtmlPage AsHtmlPage(object value) { return AsHtmlPage(value, null); }
            
            #endregion

            public void Clear()
            {
                Monitor.Enter(SyncRoot);
                try
                {
                    foreach (HtmlPage page in _innerList)
                        page._parentCollection = null;
                    _innerList.Clear();
                }
                finally { Monitor.Exit(SyncRoot); }
            }

            #region Contains Methods

            public bool Contains(HtmlPage item) { return _innerList.Contains(item); }

            bool IList.Contains(object value) { return TryCastAsHtmlPage(value, out HtmlPage item) && Contains(item); }

            #endregion

            #region CopyTo Methods

            public void CopyTo(HtmlPage[] array, int arrayIndex) { _innerList.CopyTo(array, arrayIndex); }

            void ICollection.CopyTo(Array array, int index) { _innerList.ToArray().CopyTo(array, index); }

            #endregion

            #region GetEnumerator Methods

            public IEnumerator<HtmlPage> GetEnumerator() { return _innerList.GetEnumerator(); }

            IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }

            #endregion

            #region IndexOf Methods

            public int IndexOf(HtmlPage item) { return _innerList.IndexOf(item); }

            int IList.IndexOf(object value) { return (TryCastAsHtmlPage(value, out HtmlPage item)) ? IndexOf(item) : -1; }

            #endregion

            #region Insert Methods

            public void Insert(int index, HtmlPage item)
            {
                if (item == null)
                    throw new ArgumentNullException("item");
                Monitor.Enter(SyncRoot);
                try
                {
                    Monitor.Enter(item.SyncRoot);
                    try
                    {
                        if (_parent != null && (ReferenceEquals(item, _parent) || _parent.IsContainedBy(item)))
                            throw new InvalidOperationException("Cannot created circular hierarchical item references");
                        if (item._parentCollection != null)
                        {
                            if (ReferenceEquals(item._parentCollection, this))
                            {
                                if (index < 0 || index >= _innerList.Count)
                                    throw new ArgumentOutOfRangeException("index");
                                int oldIndex = _innerList.IndexOf(item);
                                if (oldIndex != index)
                                {
                                    _innerList.RemoveAt(oldIndex);
                                    if (index == _innerList.Count)
                                        _innerList.Add(item);
                                    else
                                        _innerList.Insert(index, item);
                                }
                                return;
                            }
                            if (!item._parentCollection.Remove(item))
                                throw new ArgumentException("Unable to remove item from its current colleciton");
                        }
                        _innerList.Insert(index, item);
                        item._parentCollection = this;
                    }
                    finally { Monitor.Exit(item.SyncRoot); }
                }
                finally { Monitor.Exit(SyncRoot); }
            }

            void IList.Insert(int index, object value) { Insert(index, AsHtmlPage(value)); }

            #endregion

            #region Remove Methods

            public bool Remove(HtmlPage item)
            {
                if (item != null)
                {
                    Monitor.Enter(SyncRoot);
                    try
                    {
                        Monitor.Enter(item.SyncRoot);
                        try
                        {
                            if (_innerList.Remove(item))
                            {
                                item._parentCollection = null;
                                return true;
                            }
                        }
                        finally { Monitor.Exit(item.SyncRoot); }
                    }
                    finally { Monitor.Exit(SyncRoot); }
                }
                return false;
            }

            void IList.Remove(object value)
            {
                if (TryCastAsHtmlPage(value, out HtmlPage result))
                    Remove(result);
            }

            #endregion

            public void RemoveAt(int index)
            {
                Monitor.Enter(SyncRoot);
                try
                {
                    HtmlPage item = _innerList[index];
                    _innerList.RemoveAt(index);
                    item._parentCollection = null;
                }
                finally { Monitor.Exit(SyncRoot); }
            }

            #endregion

        }
    }
}
