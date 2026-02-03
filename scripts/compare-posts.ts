// Compare manual vs script-created posts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

async function compare() {
    console.log('=== So sánh bài viết ===\n');

    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (posts) {
        posts.forEach((p, i) => {
            console.log(`\n--- Bài ${i + 1}: ${p.title} ---`);
            console.log(JSON.stringify(p, null, 2));
        });
    }
}

compare().catch(console.error);
