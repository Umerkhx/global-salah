import { getBlogBySlug } from "@/services/blog";
import BlogDetails from "../BlogDetails";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const decodedSlug = decodeURIComponent(params.slug);
  const response = await fetch(
    `https://globalsalahblogs.teckteam.org/wp-json/custom-blog-api/v1/blog/${decodedSlug}`,
    {
      headers: {
        Authorization: `Bearer 347f7627d6c4765cf911391a34a3319e2140859fbc723ebefeb4f2f39d8a1d67`,
      },
    }
  );
  const blog = await response.json();

  return {
    title: blog.blog_title || "Blog",
    description: blog.blog_meta_description || "Read this amazing blog!",
    alternates: {
      canonical: `https://globalsalah.com/en/blog/${blog.blog_slug}`,
    },
    openGraph: {
      title: blog.blog_meta_title,
      description: blog.blog_meta_description,
      images: [blog.blog_featured_image_url],
      url: `https://globalsalah.com/en/blog/${blog.blog_slug}`,
    },
  };
};

const Page = async ({ params }: { params: { slug: string; lang: string } }) => {
  const blog = await getBlogBySlug(params.slug);

  const stripHtmlAndLimit = (text: string, maxLength = 170): string => {
    const stripped = text.replace(/<[^>]*>/g, "")
    const decoded = stripped.replace(/&[^;]+;/g, " ")
    const cleaned = decoded.replace(/\s+/g, " ").trim()
    if (cleaned.length <= maxLength) return cleaned
    return cleaned.substring(0, maxLength).trim() + "..."
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://globalsalah.com/${params.lang}/blog/${blog.blog_slug}`,
    },
    headline: blog.blog_title,
    description: stripHtmlAndLimit(blog.blog_description, 170),
    image: {
      "@type": "ImageObject",
      url: blog.blog_featured_image_url,
      width: 1080,
      height: 608,
    },
    author: {
      "@type": "Person",
      name: blog.blog_author_name,
      url: `https://globalsalah.com/${params.lang}/author/${blog.blog_author_name.toLowerCase().replace(/\s+/g, "-")}`,
      image: "https://globalsalah.com/public/globalsalah-author.webp",
    },
    publisher: {
      "@type": "Organization",
      name: "Global Salah",
      logo: {
        "@type": "ImageObject",
        url: "https://globalsalah.com/public/global-logo.png",
        width: 512,
        height: 512,
      },
    },
    datePublished: blog.blog_posted_date,
    dateModified: blog.blog_posted_date,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogDetails blog={blog} />
    </>
  );
};

export default Page;
