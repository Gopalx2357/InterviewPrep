import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {
  BookOpen,
  Building2,
  UploadCloud,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  FileText,
  DollarSign,
  Tag,
  Cloud,
  HardDrive,
  ExternalLink,
} from 'lucide-react';
import { parseGoogleDriveUrl } from '../components/PdfViewerModal';

const CATEGORIES = [
  'DSA',
  'C++',
  'Java',
  'JavaScript',
  'React',
  'Node.js',
  'SQL',
  'DBMS',
  'Operating System',
  'Computer Networks',
  'System Design',
  'Aptitude',
  'HR Interview',
  'Web Development',
  'AI/ML',
  'Data Analytics',
];

const AdminUpload = () => {
  const { showToast } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('note'); // 'note' | 'company'
  const [submitting, setSubmitting] = useState(false);

  // Note Form State
  const [noteForm, setNoteForm] = useState({
    title: '',
    description: '',
    category: 'DSA',
    price: '',
    pages: '1',
    whatYouWillLearn: '',
    pdfUrl: '',
    thumbnailUrl: '',
  });
  const [noteThumbnailFile, setNoteThumbnailFile] = useState(null);
  const [notePdfFile, setNotePdfFile] = useState(null);
  const [notePdfMode, setNotePdfMode] = useState('gdrive'); // 'gdrive' | 'file'

  // Company Form State
  const [companyForm, setCompanyForm] = useState({
    name: '',
    role: '',
    description: '',
    price: '',
    oaAptitude: '',
    oaCoding: '',
    oaMcqs: '',
    oaDetails: '',
    techInterview: '',
    hrInterview: '',
    faqs: '',
    preparationContent: '',
    logoUrl: '',
    resourceUrl: '',
  });
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [companyResourceFile, setCompanyResourceFile] = useState(null);
  const [companyResourceMode, setCompanyResourceMode] = useState('gdrive'); // 'gdrive' | 'file'

  const noteDriveInfo = parseGoogleDriveUrl(noteForm.pdfUrl);
  const companyDriveInfo = parseGoogleDriveUrl(companyForm.resourceUrl);

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', noteForm.title);
      formData.append('description', noteForm.description);
      formData.append('category', noteForm.category);
      formData.append('price', noteForm.price);
      formData.append('pages', noteForm.pages);
      formData.append('whatYouWillLearn', noteForm.whatYouWillLearn);

      if (noteThumbnailFile) {
        formData.append('thumbnail', noteThumbnailFile);
      } else if (noteForm.thumbnailUrl) {
        formData.append('thumbnail', noteForm.thumbnailUrl);
      }

      if (notePdfMode === 'file' && notePdfFile) {
        formData.append('pdf', notePdfFile);
      } else if (noteForm.pdfUrl) {
        formData.append('pdfUrl', noteForm.pdfUrl.trim());
      }

      await API.post('/notes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      showToast('Note uploaded and published successfully!', 'success');
      navigate('/admin/notes');
    } catch (error) {
      console.error('Error uploading note:', error);
      showToast(error.response?.data?.message || 'Failed to upload note', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', companyForm.name);
      formData.append('role', companyForm.role);
      formData.append('description', companyForm.description);
      formData.append('price', companyForm.price);
      formData.append('oaAptitude', companyForm.oaAptitude);
      formData.append('oaCoding', companyForm.oaCoding);
      formData.append('oaMcqs', companyForm.oaMcqs);
      formData.append('oaDetails', companyForm.oaDetails);
      formData.append('techInterview', companyForm.techInterview);
      formData.append('hrInterview', companyForm.hrInterview);
      formData.append('faqs', companyForm.faqs);
      formData.append('preparationContent', companyForm.preparationContent);

      if (companyLogoFile) {
        formData.append('logo', companyLogoFile);
      } else if (companyForm.logoUrl) {
        formData.append('logo', companyForm.logoUrl);
      }

      if (companyResourceMode === 'file' && companyResourceFile) {
        formData.append('resource', companyResourceFile);
      } else if (companyForm.resourceUrl) {
        formData.append('resources', companyForm.resourceUrl.trim());
      }

      await API.post('/companies', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      showToast('Company preparation package published!', 'success');
      navigate('/admin/companies');
    } catch (error) {
      console.error('Error uploading company prep:', error);
      showToast(error.response?.data?.message || 'Failed to publish company package', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Dashboard</span>
        </Link>

        {/* Tab Header */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('note')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'note'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Upload Note</span>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'company'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Add Company OA Kit</span>
          </button>
        </div>

        {/* Upload Form Area */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {activeTab === 'note' ? (
            <form onSubmit={handleNoteSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Upload Preparation Note</h2>
                <p className="text-xs text-slate-500 mt-1">Publish new handwritten or digital study materials.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                    placeholder="e.g. Master Dynamic Programming Notes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category *</label>
                  <select
                    value={noteForm.category}
                    onChange={(e) => setNoteForm({ ...noteForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={noteForm.price}
                    onChange={(e) => setNoteForm({ ...noteForm, price: e.target.value })}
                    placeholder="e.g. 299 (Enter 0 for Free)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Pages</label>
                  <input
                    type="number"
                    min="1"
                    value={noteForm.pages}
                    onChange={(e) => setNoteForm({ ...noteForm, pages: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description *</label>
                  <textarea
                    required
                    rows="3"
                    value={noteForm.description}
                    onChange={(e) => setNoteForm({ ...noteForm, description: e.target.value })}
                    placeholder="Brief description of the note contents..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    What You'll Learn (One topic per line)
                  </label>
                  <textarea
                    rows="3"
                    value={noteForm.whatYouWillLearn}
                    onChange={(e) => setNoteForm({ ...noteForm, whatYouWillLearn: e.target.value })}
                    placeholder="0/1 Knapsack patterns&#10;LeetCode Medium-Hard solutions&#10;Complexity proofs"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                {/* PDF Resource Source Toggle (Google Drive vs Local File) */}
                <div className="sm:col-span-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-200/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        PDF Notes Resource *
                      </label>
                      <span className="text-[11px] text-slate-500">
                        Choose storage source for this note's PDF
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setNotePdfMode('gdrive');
                          setNotePdfFile(null);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          notePdfMode === 'gdrive'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Cloud className="w-3.5 h-3.5" />
                        <span>Google Drive (0 Disk Space)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNotePdfMode('file')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          notePdfMode === 'file'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>Upload File (Local)</span>
                      </button>
                    </div>
                  </div>

                  {notePdfMode === 'gdrive' ? (
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-700">Paste Google Drive Share Link:</span>
                          {noteDriveInfo && (
                            <a
                              href={noteDriveInfo.previewUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" /> Test Link Preview
                            </a>
                          )}
                        </div>
                        <input
                          type="text"
                          required={notePdfMode === 'gdrive'}
                          value={noteForm.pdfUrl}
                          onChange={(e) => setNoteForm({ ...noteForm, pdfUrl: e.target.value })}
                          placeholder="https://drive.google.com/file/d/1w6x_Z8Y9q.../view?usp=sharing"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>

                      {/* Google Drive 3-Step Setup Guide */}
                      <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3.5 text-[11px] text-slate-700 space-y-1.5">
                        <p className="font-bold text-blue-900 flex items-center gap-1.5">
                          <span>💡 3-Step Google Drive Setup (Free Cloud Storage):</span>
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
                          <li>Apne Google Drive par PDF upload karein.</li>
                          <li>PDF par right-click karein ➔ <strong>Share</strong> ➔ General Access ko <strong>"Anyone with the link can view"</strong> karein.</li>
                          <li><strong>"Copy link"</strong> par click karke upar wale box me paste kar dein.</li>
                        </ol>
                        {noteDriveInfo && (
                          <div className="mt-2 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center gap-2">
                            <span>✅ Valid Google Drive Link Detected! (ID: {noteDriveInfo.id.slice(0, 12)}...)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select PDF from Computer</label>
                      <input
                        type="file"
                        accept=".pdf"
                        required={notePdfMode === 'file' && !noteForm.pdfUrl}
                        onChange={(e) => setNotePdfFile(e.target.files[0])}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-[10px] text-slate-400">PDF will be saved in your server's backend/uploads folder (Max 20MB).</p>
                    </div>
                  )}
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thumbnail Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNoteThumbnailFile(e.target.files[0])}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                  <input
                    type="text"
                    value={noteForm.thumbnailUrl}
                    onChange={(e) => setNoteForm({ ...noteForm, thumbnailUrl: e.target.value })}
                    placeholder="Or enter Image URL"
                    className="mt-2 w-full px-3 py-1.5 rounded-lg border text-xs text-slate-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
                <span>Publish Note</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleCompanySubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Add Company OA & Interview Package</h2>
                <p className="text-xs text-slate-500 mt-1">Create company-specific test preparation suites.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    placeholder="e.g. Amazon / TCS / Infosys"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Job Role *</label>
                  <input
                    type="text"
                    required
                    value={companyForm.role}
                    onChange={(e) => setCompanyForm({ ...companyForm, role: e.target.value })}
                    placeholder="e.g. SDE-1 / Digital Software Engineer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Package Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={companyForm.price}
                    onChange={(e) => setCompanyForm({ ...companyForm, price: e.target.value })}
                    placeholder="e.g. 499 (Enter 0 for Free)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Package Description *</label>
                  <textarea
                    required
                    rows="3"
                    value={companyForm.description}
                    onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                    placeholder="Overview of this company prep kit..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  ></textarea>
                </div>

                {/* OA Details */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">OA Aptitude Breakdown</label>
                  <input
                    type="text"
                    value={companyForm.oaAptitude}
                    onChange={(e) => setCompanyForm({ ...companyForm, oaAptitude: e.target.value })}
                    placeholder="Quant, Logical, Verbal details"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">OA Coding Breakdown</label>
                  <input
                    type="text"
                    value={companyForm.oaCoding}
                    onChange={(e) => setCompanyForm({ ...companyForm, oaCoding: e.target.value })}
                    placeholder="2 Medium-Hard DP/Graph questions (60 mins)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">OA MCQs & Pseudocode</label>
                  <input
                    type="text"
                    value={companyForm.oaMcqs}
                    onChange={(e) => setCompanyForm({ ...companyForm, oaMcqs: e.target.value })}
                    placeholder="Software Engg & Debugging questions"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">OA Exam Overview Rules</label>
                  <input
                    type="text"
                    value={companyForm.oaDetails}
                    onChange={(e) => setCompanyForm({ ...companyForm, oaDetails: e.target.value })}
                    placeholder="Cutoff details and rules"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                {/* Interview Details */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Technical Interview Info</label>
                  <textarea
                    rows="2"
                    value={companyForm.techInterview}
                    onChange={(e) => setCompanyForm({ ...companyForm, techInterview: e.target.value })}
                    placeholder="Focus areas for technical rounds..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                  ></textarea>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">HR & Behavioral Info</label>
                  <textarea
                    rows="2"
                    value={companyForm.hrInterview}
                    onChange={(e) => setCompanyForm({ ...companyForm, hrInterview: e.target.value })}
                    placeholder="Culture fitment guidelines..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                  ></textarea>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Frequent Interview Questions (One per line)
                  </label>
                  <textarea
                    rows="3"
                    value={companyForm.faqs}
                    onChange={(e) => setCompanyForm({ ...companyForm, faqs: e.target.value })}
                    placeholder="Difference between Abstract Class and Interface?&#10;Reverse Nodes in k-Group"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                  ></textarea>
                </div>

                {/* Company Resource Source Toggle (Google Drive vs Local File) */}
                <div className="sm:col-span-2 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 border border-indigo-200/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Company Prep Resource Package *
                      </label>
                      <span className="text-[11px] text-slate-500">
                        Choose storage source for this company's PDF / Kit
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setCompanyResourceMode('gdrive');
                          setCompanyResourceFile(null);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          companyResourceMode === 'gdrive'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Cloud className="w-3.5 h-3.5" />
                        <span>Google Drive (0 Disk Space)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCompanyResourceMode('file')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          companyResourceMode === 'file'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>Upload File (Local)</span>
                      </button>
                    </div>
                  </div>

                  {companyResourceMode === 'gdrive' ? (
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-indigo-200 shadow-sm">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-700">Paste Google Drive Share Link:</span>
                          {companyDriveInfo && (
                            <a
                              href={companyDriveInfo.previewUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-indigo-600 font-bold hover:underline inline-flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" /> Test Link Preview
                            </a>
                          )}
                        </div>
                        <input
                          type="text"
                          required={companyResourceMode === 'gdrive'}
                          value={companyForm.resourceUrl}
                          onChange={(e) => setCompanyForm({ ...companyForm, resourceUrl: e.target.value })}
                          placeholder="https://drive.google.com/file/d/1w6x_Z8Y9q.../view?usp=sharing"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                        />
                      </div>

                      {/* Google Drive 3-Step Setup Guide */}
                      <div className="bg-indigo-50/80 border border-indigo-100 rounded-xl p-3.5 text-[11px] text-slate-700 space-y-1.5">
                        <p className="font-bold text-indigo-900 flex items-center gap-1.5">
                          <span>💡 3-Step Google Drive Setup (Free Cloud Storage):</span>
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
                          <li>Apne Google Drive par PDF upload karein.</li>
                          <li>PDF par right-click karein ➔ <strong>Share</strong> ➔ General Access ko <strong>"Anyone with the link can view"</strong> karein.</li>
                          <li><strong>"Copy link"</strong> par click karke upar wale box me paste kar dein.</li>
                        </ol>
                        {companyDriveInfo && (
                          <div className="mt-2 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center gap-2">
                            <span>✅ Valid Google Drive Link Detected! (ID: {companyDriveInfo.id.slice(0, 12)}...)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select PDF Package from Computer</label>
                      <input
                        type="file"
                        accept=".pdf"
                        required={companyResourceMode === 'file' && !companyForm.resourceUrl}
                        onChange={(e) => setCompanyResourceFile(e.target.files[0])}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                      <p className="text-[10px] text-slate-400">PDF will be saved in your server's backend/uploads folder (Max 20MB).</p>
                    </div>
                  )}
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Logo Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCompanyLogoFile(e.target.files[0])}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                  <input
                    type="text"
                    value={companyForm.logoUrl}
                    onChange={(e) => setCompanyForm({ ...companyForm, logoUrl: e.target.value })}
                    placeholder="Or enter Logo SVG/PNG URL"
                    className="mt-2 w-full px-3 py-1.5 rounded-lg border text-xs text-slate-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
                <span>Publish Company OA Package</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
