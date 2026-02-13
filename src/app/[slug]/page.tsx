import { getDocumentContent } from '@/lib/content';

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = params;
  const { contentHtml, title } = await getDocumentContent(slug);

  const slugToPdf: { [key: string]: string } = {
    'master-policy': '00_master_policy.pdf',
    'legislative-brief': '01_legislative_brief.pdf',
    'advocacy-brief': '02_advocacy_brief.pdf',
    'academic-paper': '03_academic_paper.pdf',
    'clinical-brief': '04_clinical_brief.pdf',
    'essay': 'autonomy_exit_essay.pdf',
  };

  const pdfFileName = slugToPdf[slug];

  return (
    <article className="prose lg:prose-xl">
      <h1>{title}</h1>
      {pdfFileName && (
        <a 
          href={`/documents/${pdfFileName}`} 
          download
          className="text-blue-600 hover:underline mb-4 block"
        >
          Download PDF
        </a>
      )}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
