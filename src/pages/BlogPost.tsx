import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Blog WebCraft`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", post.excerpt);
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 lg:pt-36 pb-20">
        <article className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Înapoi la blog
          </Link>

          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full glass text-primary font-semibold text-xs uppercase tracking-widest mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10 aspect-[16/9] bg-muted">
            <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-foreground/85 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:text-foreground/85 prose-li:my-1
            prose-code:text-primary prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-14 card-premium glow-border rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-3">Vrei un site la fel de îngrijit?</h2>
            <p className="text-muted-foreground mb-6">
              Discută cu noi despre proiectul tău. Primă consultare gratuită.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="professional" size="lg" asChild>
                <Link to="/#contact">Cere ofertă</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/audit">Audit gratuit</Link>
              </Button>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display text-2xl font-bold mb-6">Citește în continuare</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="card-premium rounded-2xl p-5 hover-lift block group"
                  >
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">{p.category}</span>
                    <h4 className="font-display font-bold mt-2 mb-2 group-hover:text-primary transition-colors">
                      {p.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                      Citește <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
