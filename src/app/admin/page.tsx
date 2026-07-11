'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Tab State: Toggle between projects & blogs
  const [activeTab, setActiveTab] = useState<'project' | 'blog'>('project');

  // Project Form State
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    tags: '',
    liveLink: '',
    githubLink: '',
    featured: false,
  });

  // Blog Form State
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    summary: '',
    category: '',
    watchUrl: '',
    readTime: '5 MIN READ',
    tags: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setProjectFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlogFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTabChange = (tab: 'project' | 'blog') => {
    setActiveTab(tab);
    setStatus(null);
    setImage(null);
    setPreview(null);
  };

  // Submit flow
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!image) {
      setStatus({ type: 'error', message: 'Please select an image cover' });
      setLoading(false);
      return;
    }

    const uploadData = new FormData();
    uploadData.append('image', image);

    const isProject = activeTab === 'project';
    const targetUrl = isProject ? '/api/projects/upload' : '/api/blogs/upload';
    const currentForm = isProject ? projectFormData : blogFormData;

    Object.entries(currentForm).forEach(([key, value]) => {
      uploadData.append(key, String(value));
    });

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
        body: uploadData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: `${isProject ? 'Project' : 'Blog post'} uploaded successfully!` 
        });
        
        // Reset states
        if (isProject) {
          setProjectFormData({
            title: '',
            description: '',
            longDescription: '',
            tags: '',
            liveLink: '',
            githubLink: '',
            featured: false,
          });
        } else {
          setBlogFormData({
            title: '',
            summary: '',
            category: '',
            watchUrl: '',
            readTime: '5 MIN READ',
            tags: '',
          });
        }
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
          <div className="absolute inset-0 bg-[#3B82F6]/5 -rotate-2 -z-10" />
          <div className="mb-12 text-center">
            <span className="text-[#3B82F6] font-black tracking-[0.4em] uppercase text-xs mb-4 block">Secure Access</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Admin <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Login</span></h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 group-focus-within:text-[#3B82F6] transition-colors">Master Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors placeholder:text-gray-800 text-xl font-bold"
              />
              {loginError && <p className="text-[#3B82F6] text-[10px] font-black uppercase mt-2">Invalid Access Key</p>}
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-[#3B82F6] text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-500"
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
        
        {/* Toggle tabs and Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="text-[#3B82F6] font-black tracking-[0.3em] uppercase text-sm mb-4 block">
              Dashboard
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none">
              Upload <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>{activeTab === 'project' ? 'Project' : 'Blog'}</span>
            </h1>
          </div>

          {/* Selector Tabs */}
          <div className="flex bg-[#111] border border-white/5 rounded-full p-1.5 shrink-0">
            <button
              onClick={() => handleTabChange('project')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'project' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => handleTabChange('blog')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'blog' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Blogs
            </button>
          </div>
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
          {/* Project Form Render */}
          {activeTab === 'project' ? (
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Project Title</label>
                <input
                  required
                  name="title"
                  value={projectFormData.title}
                  onChange={handleProjectInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors font-bold uppercase text-xl"
                  placeholder="E.G. AI DASHBOARD"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Short Description</label>
                <textarea
                  required
                  name="description"
                  value={projectFormData.description}
                  onChange={handleProjectInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors font-medium text-gray-400 resize-none"
                  placeholder="A brief overview of the project..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Live Link</label>
                  <input
                    name="liveLink"
                    value={projectFormData.liveLink}
                    onChange={handleProjectInputChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">GitHub Link</label>
                  <input
                    name="githubLink"
                    value={projectFormData.githubLink}
                    onChange={handleProjectInputChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Tags (Comma separated)</label>
                <input
                  name="tags"
                  value={projectFormData.tags}
                  onChange={handleProjectInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm uppercase tracking-widest"
                  placeholder="REACT, NODE, NEXTJS"
                />
              </div>

              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  name="featured"
                  checked={projectFormData.featured}
                  onChange={(e) => setProjectFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="hidden"
                />
                <div className={`w-6 h-6 border-2 transition-all flex items-center justify-center ${projectFormData.featured ? 'bg-[#3B82F6] border-[#3B82F6]' : 'border-white/20'}`}>
                  {projectFormData.featured && <CheckCircle2 size={16} className="text-white" />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-[#3B82F6] transition-colors">Mark as Featured Work</span>
              </label>
            </div>
          ) : (
            /* Blog Form Render */
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Blog Title</label>
                <input
                  required
                  name="title"
                  value={blogFormData.title}
                  onChange={handleBlogInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors font-bold uppercase text-xl"
                  placeholder="E.G. THE RISE OF AGENTIC AI"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Blog Summary</label>
                <textarea
                  required
                  name="summary"
                  value={blogFormData.summary}
                  onChange={handleBlogInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors font-medium text-gray-400 resize-none"
                  placeholder="Write a clear, brief summary of what the reader learns..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Category</label>
                  <input
                    required
                    name="category"
                    value={blogFormData.category}
                    onChange={handleBlogInputChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm uppercase tracking-widest font-bold"
                    placeholder="AI TOOLS, UI/UX, DEV"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Read Time</label>
                  <input
                    required
                    name="readTime"
                    value={blogFormData.readTime}
                    onChange={handleBlogInputChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm font-bold"
                    placeholder="5 MIN READ"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Final Link to Watch / Read</label>
                <input
                  required
                  name="watchUrl"
                  value={blogFormData.watchUrl}
                  onChange={handleBlogInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm text-[#3B82F6] font-semibold"
                  placeholder="https://youtu.be/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Tags (Comma separated)</label>
                <input
                  name="tags"
                  value={blogFormData.tags}
                  onChange={handleBlogInputChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm uppercase tracking-widest"
                  placeholder="AGENTICAI, DEVTOOLS, CODING"
                />
              </div>
            </div>
          )}

          {/* Right Side: Image Upload & Submit button */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                {activeTab === 'project' ? 'Project Preview Image' : 'Blog Cover Image'}
              </label>
              <div 
                className={`relative aspect-video border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 overflow-hidden group ${
                  preview ? 'border-[#3B82F6]/50' : 'border-white/10 hover:border-[#3B82F6]/30'
                }`}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setImage(null); setPreview(null); }}
                      className="absolute top-4 right-4 p-2 bg-black/80 text-white rounded-full hover:bg-[#3B82F6] transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload size={32} className="text-gray-600 group-hover:text-[#3B82F6] transition-colors" />
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
              className="w-full py-6 bg-[#3B82F6] text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  Uploading...
                  <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  Post {activeTab === 'project' ? 'Project' : 'Blog Post'}
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
