import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, blogCategories } from "@/data/blogPosts";

const Blog = () => {
  const [category, setCategory] = useState<(typeof blogCategories)[number]>("Toate");

  useEffect(() => {
    document.title = "Blog WebCraft | Resurse despre web design, SEO și business online";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Articole practice despre web design, SEO, performanță și creșterea afacerilor online. Sfaturi din experiența reală a echipei WebCraft."
    );
  }, []);

  const filtered = useMemo(
    () => (category === "Toate" ? blogPosts : blogPosts.filter((p) => p.category === category)),
    [category]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 lg:pt-36 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <section className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-5">
              Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
              Resurse pentru <span className="text-gradient">afaceri online</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Sfaturi practice, ghiduri și analize din munca noastră zilnică cu site-uri reale.
            </p>
          </section>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group card-premium glow-border rounded-2xl overflow-hidden hover-lift block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-semibold text-primary">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-primary font-semibold text-sm">
                    Citește <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
