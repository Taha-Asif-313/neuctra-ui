import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, handleEditBlog } = useAdmin();

  const blog = blogs.find((b) => b.id === parseInt(id));

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "React",
    tags: "",
    featured: false,
  });

  const categories = [
    "React",
    "JavaScript",
    "CSS",
    "Tutorial",
    "Design",
    "Development",
  ];

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "React",
        tags: blog.tags ? blog.tags.join(", ") : "",
        featured: blog.featured || false,
      });
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/50">Blog not found</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlog = {
      ...formData,
      id: blog.id,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    handleEditBlog(updatedBlog);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* TOP BAR */}
      <div className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-white/60 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="text-center">
            <h1 className="text-lg font-medium text-white">
              Editing Blog
            </h1>
            <p className="text-xs text-white/40 truncate max-w-[200px]">
              {blog.title}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
          >
            <Save size={16} />
            Update
          </button>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT: EDITOR */}
        <div className="lg:col-span-8 space-y-6">

          {/* Title */}
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full text-3xl md:text-4xl font-semibold bg-transparent border-b border-white/10 pb-4 focus:border-primary outline-none"
            placeholder="Blog title..."
          />

          {/* Excerpt */}
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white/70 focus:border-primary outline-none h-24"
            placeholder="Short description..."
          />

          {/* Content */}
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white/80 focus:border-primary outline-none h-[420px] font-mono text-sm"
            placeholder="Write content..."
          />
        </div>

        {/* RIGHT: SETTINGS */}
        <div className="lg:col-span-4 space-y-6">

          {/* Status Card */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-sm text-white/70 mb-4">
              Edit Settings
            </h3>

            {/* Category */}
            <div className="mb-4">
              <label className="text-xs text-white/50">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full mt-2 bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="text-xs text-white/50">Tags</label>
              <input
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full mt-2 bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary"
                placeholder="react, ui, css"
              />
            </div>

            {/* Featured */}
            <label className="flex items-center gap-2 text-sm text-white/60">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featured: e.target.checked,
                  })
                }
              />
              Featured post
            </label>
          </div>

          {/* AI Assistant Card */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles size={16} />
              AI Assistant
            </div>

            <p className="text-xs text-white/50">
              Improve readability, SEO, or rewrite sections.
            </p>

            <button className="mt-3 w-full px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm">
              Optimize Post
            </button>
          </div>

          {/* Live Preview */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h4 className="text-sm text-white/70 mb-3">
              Live Preview
            </h4>

            <h3 className="font-medium text-white">
              {formData.title || "Title preview"}
            </h3>

            <p className="text-xs text-white/50 mt-2 line-clamp-3">
              {formData.excerpt || "Excerpt preview..."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditBlogPage;