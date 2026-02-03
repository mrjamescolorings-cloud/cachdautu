-- Comments table for blog posts
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow public to insert comments (moderation via is_approved)
CREATE POLICY "Anyone can insert comments" ON comments
    FOR INSERT WITH CHECK (true);

-- Only show approved comments publicly
CREATE POLICY "Public can view approved comments" ON comments
    FOR SELECT USING (is_approved = true);
