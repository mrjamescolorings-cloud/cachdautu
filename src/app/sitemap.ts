import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://cachdautu.com";

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    // Get categories
    const { data: categories } = await supabase.from("categories").select("slug");
    const categoryPages: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
        url: `${baseUrl}/blog/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Get published posts
    const { data: posts } = await supabase
        .from("posts")
        .select("slug, updated_at, categories(slug)")
        .eq("is_published", true);

    const postPages: MetadataRoute.Sitemap = (posts || []).map((post: any) => ({
        url: `${baseUrl}/blog/${post.categories?.slug || "uncategorized"}/${post.slug}`,
        lastModified: new Date(post.updated_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...categoryPages, ...postPages];
}
