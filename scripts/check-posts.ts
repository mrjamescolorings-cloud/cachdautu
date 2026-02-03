// Check posts in Supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

async function check() {
    console.log('=== Checking Posts ===\n');

    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('id, title, slug, is_published, category_id')
        .limit(10);

    if (postsError) {
        console.log('Posts Error:', postsError.message);
    } else {
        console.log(`Found ${posts?.length || 0} posts:`);
        posts?.forEach(p => {
            console.log(`  - [${p.is_published ? 'Published' : 'Draft'}] ${p.title}`);
        });
    }

    console.log('\n=== Checking Categories ===\n');

    const { data: cats, error: catsError } = await supabase
        .from('categories')
        .select('id, name, slug');

    if (catsError) {
        console.log('Categories Error:', catsError.message);
    } else {
        console.log(`Found ${cats?.length || 0} categories:`);
        cats?.forEach(c => {
            console.log(`  - ${c.name} (${c.slug})`);
        });
    }

    console.log('\n=== Test Join Query ===\n');

    const { data: joinData, error: joinError } = await supabase
        .from('posts')
        .select('title, is_published, categories(name, slug)')
        .eq('is_published', true)
        .limit(5);

    if (joinError) {
        console.log('Join Error:', joinError.message);
    } else {
        console.log('Join result:');
        console.log(JSON.stringify(joinData, null, 2));
    }
}

check().catch(console.error);
