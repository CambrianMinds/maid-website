import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MAiD Research
        </Link>
        <div className="space-x-4">
          <Link href="/master-policy" className="text-gray-600 hover:text-gray-900">Master Policy</Link>
          <Link href="/legislative-brief" className="text-gray-600 hover:text-gray-900">Legislative Brief</Link>
          <Link href="/advocacy-brief" className="text-gray-600 hover:text-gray-900">Advocacy Brief</Link>
          <Link href="/academic-paper" className="text-gray-600 hover:text-gray-900">Academic Paper</Link>
          <Link href="/clinical-brief" className="text-gray-600 hover:text-gray-900">Clinical Brief</Link>
          <Link href="/essay" className="text-gray-600 hover:text-gray-900">Essay</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
