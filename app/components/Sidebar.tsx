import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'Investigator', href: '/' },
  { label: 'Sign up', href: '#' },
  { label: 'Login', href: '#' },
  { label: 'Contact us', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Help Center', href: '#' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-[#6d2177] to-[#2d0b3a] text-white py-8 px-6 shadow-xl fixed left-0 top-0 z-30">
      <div className="flex items-center mb-12">
        <Image src="/logoNew.webp" alt="Lazo Logo" width={48} height={48} className="mr-3" />
        <span className="text-2xl font-bold tracking-tight">Lazo</span>
      </div>
      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="rounded-lg px-4 py-2 hover:bg-[#8b5cf6]/20 transition-colors text-lg font-medium">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto text-xs text-purple-200 opacity-60 pt-8">
        &copy; {new Date().getFullYear()} Lazo
      </div>
    </aside>
  );
} 