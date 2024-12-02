import React from "react";
import BlogPostDetail from "@/components/GetBlog";

const BlogPostPage = async ({ params }) => {
  const { id } = await params;

  return <BlogPostDetail id={id} />;
};

export default BlogPostPage;
