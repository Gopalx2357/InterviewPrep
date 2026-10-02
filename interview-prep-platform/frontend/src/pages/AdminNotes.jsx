import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Loader2,
  ArrowLeft,
  FileText,
  Search,
  Check,
  X,
} from 'lucide-react';

const AdminNotes = () => {
  const { showToast } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', category: '', price: '', description: '' });

  const fetchNotes = async () => {
    try {
      const res = await API.get('/notes');
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      showToast('Failed to load notes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await API.delete(`/notes/${id}`);
      showToast('Note deleted successfully', 'success');
      setNotes(notes.filter((n) => n._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      showToast('Failed to delete note', 'error');
    }
  };

  const handleStartEdit = (note) => {
    setEditingNote(note);
    setEditForm({
      title: note.title,
      category: note.category,
      price: note.price,
      description: note.description,
      pdfUrl: note.pdfUrl || '',
    });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await API.put(`/notes/${editingNote._id}`, editForm);
      showToast('Note updated successfully!', 'success');
      setNotes(notes.map((n) => (n._id === editingNote._id ? res.data : n)));
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
      showToast('Failed to update note', 'error');
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Dashboard</span>
          </Link>

          <Link
            to="/admin/upload"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Note</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">Manage Published Notes</h1>
              <p className="text-xs text-slate-500 mt-0.5">Edit note details, update pricing, or remove resources.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">No notes found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Resource Link</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredNotes.map((note) => {
                    const isEditing = editingNote?._id === note._id;

                    return (
                      <tr key={note._id} className="hover:bg-slate-50">
                        <td className="py-3.5 max-w-xs">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-xs"
                            />
                          ) : (
                            <span className="font-bold text-slate-900 line-clamp-1">{note.title}</span>
                          )}
                        </td>

                        <td className="py-3.5">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.category}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="w-24 px-2 py-1 border rounded text-xs"
                            />
                          ) : (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold text-[11px]">
                              {note.category}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editForm.price}
                              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                              className="w-20 px-2 py-1 border rounded text-xs"
                            />
                          ) : (
                            <span className="font-extrabold text-slate-900">
                              {note.price === 0 ? 'FREE' : `₹${note.price}`}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 max-w-[200px]">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.pdfUrl}
                              onChange={(e) => setEditForm({ ...editForm, pdfUrl: e.target.value })}
                              placeholder="PDF URL or Google Drive link"
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                            />
                          ) : note.pdfUrl?.includes('drive.google.com') ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-semibold">
                              <span>🔗</span> Google Drive
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-slate-500 truncate block max-w-[180px]" title={note.pdfUrl}>
                              {note.pdfUrl}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={handleSaveEdit}
                                className="p-1.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200"
                                title="Save"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingNote(null)}
                                className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleStartEdit(note)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(note._id, note.title)}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNotes;
