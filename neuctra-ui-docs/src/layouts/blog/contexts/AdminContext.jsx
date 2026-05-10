import React, { createContext, useContext, useState, useEffect } from "react";
import { blogPosts } from "../utils/blogData";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogs, setBlogs] = useState(blogPosts);

  // Check for existing admin session
  useEffect(() => {
    const adminSession = localStorage.getItem("blogAdminSession");
    if (adminSession === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    // Simple authentication (in production, use proper auth)
    if (username === "admin" && password === "admin123") {
      setIsAdmin(true);
      localStorage.setItem("blogAdminSession", "true");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("blogAdminSession");
  };

  const handleCreateBlog = (newBlog) => {
    const blog = {
      ...newBlog,
      id: Date.now(),
      author: "Admin",
      date: new Date().toLocaleDateString(),
      readTime: Math.ceil(newBlog.content.split(" ").length / 200) + " min read"
    };
    setBlogs([blog, ...blogs]);
  };

  const handleEditBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => 
      blog.id === updatedBlog.id ? updatedBlog : blog
    ));
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

  const value = {
    isAdmin,
    blogs,
    handleLogin,
    handleLogout,
    handleCreateBlog,
    handleEditBlog,
    handleDeleteBlog
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
