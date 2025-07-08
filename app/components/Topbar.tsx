import Link from 'next/link';

export default function Topbar() {
  return (
    <header className="sticky top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 shadow z-20 ml-0 md:ml-64">
      <div className="flex items-center gap-4">
        {/* Placeholder for future search or logo */}
      </div>
      <div>
        <Link href="#" className="bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all">
          View Catalog
        </Link>
      </div>
    </header>
  );
} 