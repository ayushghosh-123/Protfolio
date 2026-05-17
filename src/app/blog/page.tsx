import BlogSection from "@/components/blog";

export const metadata = {
  title: "Blog | Ayush Ghosh",
  description: "Insights, tutorials, and summaries on Agentic AI, UI/UX, and Fullstack Engineering.",
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      <BlogSection />
    </div>
  );
}
