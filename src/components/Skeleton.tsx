export function BlogCardSkeleton() {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-video bg-white/10" />

            {/* Content skeleton */}
            <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-white/10 rounded" />
                <div className="h-5 w-full bg-white/10 rounded" />
                <div className="h-5 w-3/4 bg-white/10 rounded" />
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-2/3 bg-white/10 rounded" />
                <div className="flex justify-between pt-2">
                    <div className="h-3 w-16 bg-white/10 rounded" />
                    <div className="h-3 w-16 bg-white/10 rounded" />
                </div>
            </div>
        </div>
    );
}

export function PostSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="flex gap-2 mb-8">
                <div className="h-4 w-16 bg-white/10 rounded" />
                <div className="h-4 w-4 bg-white/10 rounded" />
                <div className="h-4 w-12 bg-white/10 rounded" />
            </div>

            {/* Header skeleton */}
            <div className="h-6 w-24 bg-accent-blue/20 rounded-full mb-4" />
            <div className="h-10 w-full bg-white/10 rounded mb-2" />
            <div className="h-10 w-3/4 bg-white/10 rounded mb-6" />

            {/* Meta skeleton */}
            <div className="flex gap-6 mb-10">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="h-4 w-20 bg-white/10 rounded" />
            </div>

            {/* Image skeleton */}
            <div className="aspect-video bg-white/10 rounded-3xl mb-10" />

            {/* Content skeleton */}
            <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-4 w-full bg-white/10 rounded" style={{ width: `${85 + Math.random() * 15}%` }} />
                ))}
            </div>
        </div>
    );
}
