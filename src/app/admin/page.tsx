'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    tags: '',
    liveLink: '',
    githubLink: '',
    featured: false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd check this via an API. For now, we'll send it with every request.
    if (password.length > 0) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!image) {
      setStatus({ type: 'error', message: 'Please select an image' });
      setLoading(false);
      return;
    }

    const uploadData = new FormData();
    uploadData.append('image', image);
    Object.entries(formData).forEach(([key, value]) => {
      uploadData.append(key, String(value));
    });

    try {
      const response = await fetch('/api/projects/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`, // Sending the password as the token
        },
        body: uploadData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Project uploaded successfully!' });
        setFormData({
          title: '',
          description: '',
          longDescription: '',
          tags: '',
          liveLink: '',
          githubLink: '',
          featured: false,
        });
        setImage(null);
        setPreview(null);
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#111] p-12 border border-white/5 relative"
        >
          <div className="absolute inset-0 bg-[#FF5722]/5 -rotate-2 -z-10" />
          <div className="mb-12 text-center">
            <span className="text-[#FF5722] font-black tracking-[0.4em] uppercase text-xs mb-4 block">Secure Access</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Admin <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Login</span></h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 group-focus-within:text-[#FF5722] transition-colors">Master Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FF5722] transition-colors placeholder:text-gray-800 text-xl font-bold"
              />
              {loginError && <p className="text-[#FF5722] text-[10px] font-black uppercase mt-2">Invalid Access Key</p>}
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-[#FF5722] text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-500"
            >
              Authorize
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-[#FF5722] font-black tracking-[0.3em] uppercase text-sm mb-4 block">
            Dashboard
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none">
            Upload <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Project</span>
          </h1>
        </div>

        {/* Status Message */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-lg mb-12 flex items-center gap-4 border ${
              status.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-200' : 'bg-red-500/10 border-red-500/50 text-red-200'
            }`}
          >
            {status.type === 'success' ? <CheckCircle2 /> : <AlertCircle />}
            <p className="font-bold uppercase tracking-tight">{status.message}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side: Details */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Project Title</label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FF5722] transition-colors font-bold uppercase text-xl"
                placeholder="E.G. AI DASHBOARD"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Short Description</label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FF5722] transition-colors font-medium text-gray-400 resize-none"
                placeholder="A brief overview of the project..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Live Link</label>
                <input
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FF5722] transition-colors text-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">GitHub Link</label>
                <input
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FF5722] transition-colors text-sm"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Tags (Comma separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#FF5722] transition-colors text-sm uppercase tracking-widest"
                placeholder="REACT, NODE, NEXTJS"
              />
            </div>

            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="hidden"
              />
              <div className={`w-6 h-6 border-2 transition-all flex items-center justify-center ${formData.featured ? 'bg-[#FF5722] border-[#FF5722]' : 'border-white/20'}`}>
                {formData.featured && <CheckCircle2 size={16} className="text-white" />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-[#FF5722] transition-colors">Mark as Featured Work</span>
            </label>
          </div>

          {/* Right Side: Image Upload */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Project Image</label>
              <div 
                className={`relative aspect-video border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 overflow-hidden group ${
                  preview ? 'border-[#FF5722]/50' : 'border-white/10 hover:border-[#FF5722]/30'
                }`}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setImage(null); setPreview(null); }}
                      className="absolute top-4 right-4 p-2 bg-black/80 text-white rounded-full hover:bg-[#FF5722] transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload size={32} className="text-gray-600 group-hover:text-[#FF5722] transition-colors" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-6 bg-[#FF5722] text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  Uploading...
                  <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  Post Project
                  <Upload size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
