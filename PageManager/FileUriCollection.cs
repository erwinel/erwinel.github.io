using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;

namespace PageManager
{
    public partial class FileUriCollection : IList<FileUri>, IList
    {
        private List<FileUri> _innerList = new List<FileUri>();

        public FileUri this[int index]
        {
            get { return _innerList[index]; }
            set
            {
                if (value == null)
                    throw new ArgumentNullException();
                Monitor.Enter(SyncRoot);
                try
                {
                    int i = _innerList.IndexOf(value);
                    if (i == index)
                    {
                        if (ReferenceEquals(_innerList[i], value))
                            return;
                    }
                    else if (i > -1)
                    {
                        _innerList.RemoveAt(i);
                        if (i < index)
                            index--;

                    }
                    _innerList[index] = value;
                }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        object IList.this[int index] { get { return _innerList[index]; } set { this[index] = ExtensionMethods.ConvertToFileUri(value); } }

        public int Count { get { return _innerList.Count; } }

        bool ICollection<FileUri>.IsReadOnly { get { return false; } }

        bool IList.IsReadOnly { get { return false; } }

        bool IList.IsFixedSize { get { return false; } }

        public object SyncRoot { get; } = new object();

        bool ICollection.IsSynchronized { get { return true; } }

        public bool Add(FileUri item)
        {
            if (item == null)
                throw new ArgumentNullException("item");
            Monitor.Enter(SyncRoot);
            try
            {
                if (!_innerList.Contains(item))
                {
                    _innerList.Add(item);
                    return true;
                }
            }
            finally { Monitor.Exit(SyncRoot); }
            return false;
        }

        void ICollection<FileUri>.Add(FileUri item) { Add(item); }

        protected int Add(object value)
        {
            if (value == null)
                throw new ArgumentNullException("value");
            int index;
            Monitor.Enter(SyncRoot);
            try
            {
                FileUri item = ExtensionMethods.ConvertToFileUri(value);
                index = IndexOf(item);
                if (index < 0)
                {
                    index = _innerList.Count;
                    _innerList.Add(item);
                }
            }
            finally { Monitor.Exit(SyncRoot); }
            return index;
        }

        int IList.Add(object value) { return Add(value); }

        public void Clear()
        {
            Monitor.Enter(SyncRoot);
            try { _innerList.Clear(); }
            finally { Monitor.Exit(SyncRoot); }
        }

        public bool Contains(FileUri item) { return _innerList.Contains(item); }

        bool IList.Contains(object value) { return ExtensionMethods.TryConvertToFileUri(value, out FileUri item) && _innerList.Contains(item); }

        public void CopyTo(FileUri[] array, int arrayIndex) { _innerList.CopyTo(array, arrayIndex); }

        void ICollection.CopyTo(Array array, int index) { _innerList.ToArray().CopyTo(array, index); }

        public IEnumerator<FileUri> GetEnumerator() { return _innerList.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }

        public int IndexOf(FileUri item) { return _innerList.IndexOf(item); }

        int IList.IndexOf(object value) { return (ExtensionMethods.TryConvertToFileUri(value, out FileUri item)) ? _innerList.IndexOf(item) : -1; }

        public void Insert(int index, FileUri item)
        {
            if (item == null)
                throw new ArgumentNullException("item");
            Monitor.Enter(SyncRoot);
            try
            {
                int oldIndex = IndexOf(item);
                if (oldIndex < 0)
                    _innerList.Insert(index, item);
                else if (oldIndex < index)
                {
                    _innerList.Insert(index, item);
                    _innerList.RemoveAt(oldIndex);
                }
                else if (oldIndex > index)
                {
                    _innerList.Insert(index, item);
                    _innerList.RemoveAt(oldIndex + 1);
                }
            }
            finally { Monitor.Exit(SyncRoot); }
        }

        void IList.Insert(int index, object value) { Insert(index, ExtensionMethods.ConvertToFileUri(value)); }

        public bool Remove(FileUri item)
        {
            if (item == null)
                return false;
            Monitor.Enter(SyncRoot);
            try { return _innerList.Remove(item); }
            finally { Monitor.Exit(SyncRoot); }
        }

        void IList.Remove(object value)
        {
            if (ExtensionMethods.TryConvertToFileUri(value, out FileUri item))
                _innerList.Remove(item);
        }

        public void RemoveAt(int index)
        {
            Monitor.Enter(SyncRoot);
            try { _innerList.RemoveAt(index); }
            finally { Monitor.Exit(SyncRoot); }
        }
    }
}
