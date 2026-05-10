import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  Search,
  Filter,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const {
    blogs,
    handleCreateBlog,
    handleEditBlog,
    handleDeleteBlog,
    handleLogout,
  } = useAdmin();

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

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "React",
      tags: "",
      featured: false,
    });
    setEditingBlog(null);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags ? blog.tags.join(", ") : "",
      featured: blog.featured || false,
    });
    setActiveTab("create");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (editingBlog) {
      handleEditBlog({ ...blogData, id: editingBlog.id });
    } else {
      handleCreateBlog(blogData);
    }

    resetForm();
    setActiveTab("list");
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/blog");
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <div>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-white/40">Manage your blog system</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex text-sm items-center gap-2">
            <Link
              to={"/blog/admin/create"}
              className="px-4 py-2 rounded-lg bg-primary flex items-center gap-2"
            >
              <Plus size={16} />
              Add Blog
            </Link>

            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 rounded-lg bg-red-600 flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* TOP ACTION BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeTab === "list"
                  ? "bg-primary text-white"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              Posts ({blogs.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("create");
                resetForm();
              }}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition ${
                activeTab === "create"
                  ? "bg-primary text-white"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              <Plus size={16} />
              {editingBlog ? "Edit" : "Create"}
            </button>
          </div>

          {/* Search */}
          {activeTab === "list" && (
            <div className="flex items-center gap-3 w-full md:w-[420px]">
              <div className="relative w-full">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-white/40"
                />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                />
              </div>

              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 flex items-center gap-2">
                <Filter size={14} />
                Filter
              </button>
            </div>
          )}
        </div>

        {/* LIST VIEW */}
        {activeTab === "list" && (
          <div className="grid gap-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition flex justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{blog.title}</h3>

                  <p className="text-sm text-white/50 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="flex gap-3 text-xs text-white/40">
                    <span className="text-primary">{blog.category}</span>
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-primary"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CREATE VIEW */}
        {activeTab === "create" && (
          <form onSubmit={handleSubmit} className="max-w-4xl space-y-5">
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              placeholder="Blog title"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary outline-none"
            />

            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  excerpt: e.target.value,
                })
              }
              placeholder="Excerpt"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg h-24 focus:border-primary outline-none"
            />

            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: e.target.value,
                })
              }
              placeholder="Content"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg h-60 font-mono focus:border-primary outline-none"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
              >
                <Save size={16} />
                Save Post
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className="px-6 py-2 bg-white/5 text-white/60 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
