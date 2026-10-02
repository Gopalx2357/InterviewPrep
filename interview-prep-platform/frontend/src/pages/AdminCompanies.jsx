import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {
  Building2,
  Plus,
  Trash2,
  Edit,
  Loader2,
  ArrowLeft,
  Search,
  Check,
  X,
  Briefcase,
} from 'lucide-react';

const AdminCompanies = () => {
  const { showToast } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingCompany, setEditingCompany] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', role: '', price: '', description: '' });

  const fetchCompanies = async () => {
    try {
      const res = await API.get('/companies');
      setCompanies(res.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      showToast('Failed to load companies list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete prep package for "${name}"?`)) return;

    try {
      await API.delete(`/companies/${id}`);
      showToast('Company package deleted', 'success');
      setCompanies(companies.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Error deleting company:', error);
      showToast('Failed to delete company package', 'error');
    }
  };

  const handleStartEdit = (company) => {
    setEditingCompany(company);
    setEditForm({
      name: company.name,
      role: company.role,
      price: company.price,
      description: company.description,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await API.put(`/companies/${editingCompany._id}`, editForm);
      showToast('Company details updated!', 'success');
      setCompanies(companies.map((c) => (c._id === editingCompany._id ? res.data : c)));
      setEditingCompany(null);
    } catch (error) {
      console.error('Error updating company:', error);
      showToast('Failed to update company package', 'error');
    }
  };

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
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
            <span>Add New Company OA</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">Manage Company OA Packages</h1>
              <p className="text-xs text-slate-500 mt-0.5">Edit company information, role details, and pricing.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search companies..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">No companies found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3">Company Name</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Resource File</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredCompanies.map((comp) => {
                    const isEditing = editingCompany?._id === comp._id;

                    return (
                      <tr key={comp._id} className="hover:bg-slate-50">
                        <td className="py-3.5 max-w-xs font-bold text-slate-900">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-xs"
                            />
                          ) : (
                            <span>{comp.name}</span>
                          )}
                        </td>

                        <td className="py-3.5 text-slate-700">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.role}
                              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-xs"
                            />
                          ) : (
                            <span>{comp.role}</span>
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
                              {comp.price === 0 ? 'FREE' : `₹${comp.price}`}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 font-mono text-[11px] text-slate-500 max-w-[150px] truncate">
                          {comp.resources || 'Not set'}
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
                                onClick={() => setEditingCompany(null)}
                                className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleStartEdit(comp)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(comp._id, comp.name)}
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

export default AdminCompanies;
