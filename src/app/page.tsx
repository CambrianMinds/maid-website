import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Medical Assistance in Dying (MAiD)</h1>
          <p className="mb-4 text-gray-600">
            This website provides a curated collection of research, policy documents, and advocacy materials concerning Medical Assistance in Dying (MAiD). The resources are intended for researchers, policymakers, clinicians, and the public to foster a deeper and more nuanced understanding of the complexities surrounding MAiD.
          </p>
          <p className="text-gray-600">
            The documents herein cover a range of topics, including ethical considerations, legislative frameworks, clinical guidelines, and advocacy efforts.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Documents</h2>
          <ul className="space-y-2">
            <li><Link href="/master-policy" className="text-blue-600 hover:underline">Master Policy</Link></li>
            <li><Link href="/legislative-brief" className="text-blue-600 hover:underline">Legislative Brief</Link></li>
            <li><Link href="/advocacy-brief" className="text-blue-600 hover:underline">Advocacy Brief</Link></li>
            <li><Link href="/academic-paper" className="text-blue-600 hover:underline">Academic Paper</Link></li>
            <li><Link href="/clinical-brief" className="text-blue-600 hover:underline">Clinical Brief</Link></li>
            <li><Link href="/essay" className="text-blue-600 hover:underline">Essay: Autonomy, Exit, and Developmentally Disabled Minors</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
