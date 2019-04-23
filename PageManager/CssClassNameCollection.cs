using System;
using System.Collections;
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
    public class CssClassNameCollection : IList<string>, IList
    {
        private List<string> _innerList = new List<string>();

        string IList<string>.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        object IList.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        int ICollection<string>.Count => throw new NotImplementedException();

        int ICollection.Count => throw new NotImplementedException();

        bool ICollection<string>.IsReadOnly => throw new NotImplementedException();

        bool IList.IsReadOnly => throw new NotImplementedException();

        bool IList.IsFixedSize => throw new NotImplementedException();

        object ICollection.SyncRoot => throw new NotImplementedException();

        bool ICollection.IsSynchronized => throw new NotImplementedException();

        void ICollection<string>.Add(string item)
        {
            throw new NotImplementedException();
        }

        int IList.Add(object value)
        {
            throw new NotImplementedException();
        }

        void ICollection<string>.Clear()
        {
            throw new NotImplementedException();
        }

        void IList.Clear()
        {
            throw new NotImplementedException();
        }

        bool ICollection<string>.Contains(string item)
        {
            throw new NotImplementedException();
        }

        bool IList.Contains(object value)
        {
            throw new NotImplementedException();
        }

        void ICollection<string>.CopyTo(string[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        void ICollection.CopyTo(Array array, int index)
        {
            throw new NotImplementedException();
        }

        IEnumerator<string> IEnumerable<string>.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        int IList<string>.IndexOf(string item)
        {
            throw new NotImplementedException();
        }

        int IList.IndexOf(object value)
        {
            throw new NotImplementedException();
        }

        void IList<string>.Insert(int index, string item)
        {
            throw new NotImplementedException();
        }

        void IList.Insert(int index, object value)
        {
            throw new NotImplementedException();
        }

        bool ICollection<string>.Remove(string item)
        {
            throw new NotImplementedException();
        }

        void IList.Remove(object value)
        {
            throw new NotImplementedException();
        }

        void IList<string>.RemoveAt(int index)
        {
            throw new NotImplementedException();
        }

        void IList.RemoveAt(int index)
        {
            throw new NotImplementedException();
        }
    }
}