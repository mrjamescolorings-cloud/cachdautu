// Check for duplicate slugs or issues
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

async function check() {
    console.log('=== Kiểm tra tổng số bài ===\n');

    const { data: allPosts, count } = await supabase
        .from('posts')
        .select('id, title, slug, is_published, category_id', { count: 'exact' })
        .eq('is_published', true);

    console.log(`Tổng số bài published: ${allPosts?.length || 0}`);

    console.log('\n=== Test query giống trang blog ===\n');

    const { data: blogPosts, error } = await supabase
        .from('posts')
        .select('*, categories(name, slug)')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.log('Lỗi:', error.message);
    } else {
        console.log(`Số bài trả về: ${blogPosts?.length || 0}`);
        console.log('\n5 bài đầu:');
        blogPosts?.slice(0, 5).forEach(p => {
            console.log(`  - ${p.title} (category: ${p.categories?.name || 'N/A'})`);
        });
    }
}

check().catch(console.error);
