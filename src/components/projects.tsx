'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, Loader, AlertCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

// interface for projects
interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
  createdAt: string;
}

// projects component
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  // fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // fetch projects 
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const data = await response.json();
      setProjects(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique tags from all projects
  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags))];

  // Filter projects based on selected tag
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const tagVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  if (error) {
    return (
      <motion.section 
        id="projects"
        className="min-h-screen bg-black px-6 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 bg-white/5 border border-[#FF5722]/50 rounded-lg p-6 text-white">
            <AlertCircle size={20} className="text-[#FF5722]" />
            <p className="font-bold uppercase tracking-tight">{error}</p>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={fetchProjects}
              className="px-8 py-3 bg-[#FF5722] text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="projects"
      className="min-h-screen bg-black text-white px-6 py-32 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#FF5722] font-black tracking-[0.3em] uppercase text-sm mb-4 block">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase leading-none">
              My <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Projects</span>
            </h2>
          </motion.div>
        </div>

        {/* Tag Filter removed per user request */}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Loader size={48} className="text-[#FF5722]" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
              Fetching Works...
            </span>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="group relative flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden transition-all duration-700 mb-8 border border-white/5 group-hover:border-[#FF5722]/30">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80';
                    }}
                  />
                  {/* Featured badge removed from here */}
                </div>

                {/* Content */}
                <div className="flex flex-col items-start">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[#FF5722] text-[10px] font-black uppercase tracking-widest"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tighter group-hover:text-[#FF5722] transition-colors flex items-center gap-3">
                    {project.featured && (
                      <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse shrink-0" title="Featured Work" />
                    )}
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium line-clamp-3">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-8 mt-auto">
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white hover:text-[#FF5722] transition-colors group/link"
                      >
                        Live Demo
                        <ExternalLink size={16} className="group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
                      </motion.a>
                    )}
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                      >
                        Source
                        <FaGithub size={16} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-40 border border-dashed border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <p className="text-gray-500 font-black uppercase tracking-[0.2em]">No projects found in this category</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}