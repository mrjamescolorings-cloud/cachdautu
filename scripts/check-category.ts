// Check category_id mapping
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

async function check() {
    // Get bat-dong-san category
    const { data: cat } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', 'bat-dong-san')
        .single();

    console.log('Category bat-dong-san:', cat);

    // Get posts with this category
    const { data: posts } = await supabase
        .from('posts')
        .select('title, category_id')
        .eq('category_id', cat?.id)
        .limit(5);

    console.log('\nPosts with category_id =', cat?.id, ':', posts?.length);

    // Get some posts and their category_ids
    const { data: allPosts } = await supabase
        .from('posts')
        .select('title, category_id, categories(name)')
        .limit(10);

    console.log('\nSample posts with category_ids:');
    allPosts?.forEach(p => {
        console.log(`  - ${p.title.substring(0, 40)}... | cat_id: ${p.category_id} | ${(p.categories as any)?.name}`);
    });
}

check().catch(console.error);
