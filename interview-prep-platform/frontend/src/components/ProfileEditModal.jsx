import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  User,
  Camera,
  Phone,
  GraduationCap,
  Briefcase,
  Globe,
  Github,
  Linkedin,
  X,
  Save,
  CheckCircle,
} from 'lucide-react';

const ProfileEditModal = ({ isOpen, onClose }) => {
  const { user, updateFullProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    officialName: '',
    phone: '',
    avatar: '',
    gender: 'Prefer not to say',
    college: '',
    gradYear: '',
    targetRole: '',
    githubUrl: '',
    linkedinUrl: '',
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        officialName: user.officialName || user.name || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
        gender: user.gender || 'Prefer not to say',
        college: user.college || '',
        gradYear: user.gradYear || '',
        targetRole: user.targetRole || '',
        githubUrl: user.githubUrl || '',
        linkedinUrl: user.linkedinUrl || '',
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setError('Image file size must be less than 3MB.');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await updateFullProfile(formData);
    if (res?.success) {
      onClose();
    } else if (res?.error) {
      setError(res.error);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Edit Candidate Profile</h3>
              <p className="text-xs text-slate-300">Update photo, gender, contact number & certificate details.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto space-y-6 text-xs custom-scrollbar">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Avatar Upload Section */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
            <label className="block text-slate-800 font-bold flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-600" />
              Profile Picture / Avatar
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Picture Preview */}
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-600/40 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shrink-0 shadow-md flex items-center justify-center">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    onError={(e) => {
                      e.target.onerror = null;
                      setFormData((prev) => ({ ...prev, avatar: '' }));
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-black text-3xl uppercase tracking-wider">
                    {(formData.officialName || formData.name || 'U').trim().charAt(0).toUpperCase()}
                  </span>
                )}

                {uploading && (
                  <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center text-white text-[10px] font-bold">
                    Uploading...
                  </div>
                )}
              </div>

              {/* Upload Option */}
              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm transition-all text-xs inline-flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Custom Photo</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {formData.avatar && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: '' })}
                      className="px-3 py-2 text-slate-500 hover:text-rose-600 font-semibold"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 block">
                  PNG, JPG or WebP images up to 3MB supported.
                </span>
              </div>
            </div>
          </div>

          {/* Basic Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Account Display Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Account Handle Name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Official Name (for Certificates)</label>
              <input
                type="text"
                name="officialName"
                value={formData.officialName}
                onChange={handleChange}
                placeholder="e.g. Rahul Yadav"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs text-slate-900 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Mobile / WhatsApp Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs text-slate-900 font-medium"
              >
                <option value="Male">Male 👨‍💻</option>
                <option value="Female">Female 👩‍💻</option>
                <option value="Other">Other 🌈</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Academic & Target Info */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Academic & Placement Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">College / University</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. IIT Delhi / NIT"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Graduation Year</label>
                <input
                  type="text"
                  name="gradYear"
                  value={formData.gradYear}
                  onChange={handleChange}
                  placeholder="e.g. 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Role / Company</label>
                <input
                  type="text"
                  name="targetRole"
                  value={formData.targetRole}
                  onChange={handleChange}
                  placeholder="e.g. TCS Digital / Amazon SDE"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-900" />
                GitHub Profile URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5 text-xs"
            >
              <Save className="w-4 h-4" />
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
