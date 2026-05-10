import React, { useMemo, useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import BlogCards from "../components/BlogCards";
import BlogsHeader from "../components/BlogsHeader";

const AllBlogsPage = () => {
  const { blogs } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <BlogsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Developer Blog
            </h1>
            <p className="text-white/50 mt-2">
              Tutorials, insights & modern web engineering
            </p>
          </div>

          <div className="text-sm text-white/40">
            {filteredBlogs.length} articles
          </div>
        </div>

        {/* Grid */}
        <BlogCards blogs={filteredBlogs} />
      </div>
    </div>
  );
};

export default AllBlogsPage;