import { Helmet } from "react-helmet-async";

const SITE = "https://webcrafthub.ro";
const DEFAULT_IMAGE = `${SITE}/og-image.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. "/despre" or "/blog/slug"
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  author,
  jsonLd,
}: SeoProps) => {
  const url = `${SITE}${path}`;
  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {author && <meta property="article:author" content={author} />}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;