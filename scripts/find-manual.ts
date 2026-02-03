// Find user's manual post
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

async function findManualPost() {
    console.log('=== Tìm bài tạo thủ công ===\n');

    // Bài tạo thủ công thường có slug khác với các slug trong script
    const scriptSlugs = [
        'huong-dan-doc-bao-cao-tai-chinh',
        'phan-tich-ky-thuat-bieu-do-nen',
        'top-co-phieu-blue-chip-2026',
        'lap-quy-khan-cap-3-thang',
    ];

    const { data: allPosts } = await supabase
        .from('posts')
        .select('slug, title, is_published, category_id, created_at')
        .order('created_at', { ascending: true })
        .limit(55);

    console.log(`Tổng số bài: ${allPosts?.length}\n`);

    // Find posts with slugs NOT in our script
    const manualPosts = allPosts?.filter(p => !scriptSlugs.some(s => p.slug.includes(s.substring(0, 10))));

    if (manualPosts && manualPosts.length > 0) {
        console.log('Bài có thể là tạo thủ công:');
        manualPosts.forEach(p => {
            console.log(`  - ${p.title} (slug: ${p.slug}, published: ${p.is_published})`);
        });
    }

    // Also check first 3 posts by creation date
    console.log('\n3 bài đầu tiên theo thời gian tạo:');
    allPosts?.slice(0, 3).forEach(p => {
        console.log(`  - ${p.title}`);
        console.log(`    slug: ${p.slug}`);
        console.log(`    is_published: ${p.is_published}`);
        console.log(`    created_at: ${p.created_at}`);
    });
}

findManualPost().catch(console.error);
