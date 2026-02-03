// Add placeholder images to all posts without featured_image
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

// Placeholder images from Unsplash
const placeholderImages = [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', // stocks
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80', // bitcoin
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', // real estate
    'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80', // gold
    'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80', // forex
];

async function addImages() {
    console.log('=== Thêm ảnh placeholder ===\n');

    // Get posts without featured_image
    const { data: posts } = await supabase
        .from('posts')
        .select('id, title, featured_image')
        .is('featured_image', null);

    console.log(`Tìm thấy ${posts?.length || 0} bài chưa có ảnh\n`);

    if (!posts || posts.length === 0) {
        console.log('Tất cả bài đã có ảnh!');
        return;
    }

    let updated = 0;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const image = placeholderImages[i % placeholderImages.length];

        const { error } = await supabase
            .from('posts')
            .update({ featured_image: image })
            .eq('id', post.id);

        if (error) {
            console.log(`❌ ${post.title}: ${error.message}`);
        } else {
            console.log(`✅ ${post.title}`);
            updated++;
        }
    }

    console.log(`\n🎉 Đã cập nhật ${updated} bài viết với ảnh placeholder!`);
    console.log('👉 Refresh trang /blog để xem kết quả!');
}

addImages().catch(console.error);
