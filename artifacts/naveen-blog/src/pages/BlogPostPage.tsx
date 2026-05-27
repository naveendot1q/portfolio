import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import PostReader from '@/components/blog/PostReader';
import type { Post } from '@/lib/types';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/posts/${slug}`)
      .then(r => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then(d => {
        if (d) { setPost(d.post); setLoading(false); }
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d1117' }}>
        <div className="flex items-center gap-3" style={{ color: '#8b949e' }}>
          <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: '#FF6B1A', borderTopColor: 'transparent' }} />
          <span className="font-mono text-sm">Loading post...</span>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d1117' }}>
        <div className="text-center">
          <div className="text-6xl mb-6">404</div>
          <h1 className="font-display font-bold text-2xl mb-2" style={{ color: '#e6edf3' }}>Post not found</h1>
          <p className="mb-6" style={{ color: '#8b949e' }}>This post doesn't exist or was removed.</p>
          <a href="/blog" className="btn btn-primary">← Back to Blog</a>
        </div>
      </div>
    );
  }

  return <PostReader post={post as any} />;
}
