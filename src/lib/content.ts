import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

function texToHtml(tex: string): string {
  let htmlContent = tex;

  // Replace \section{...} with <h2>...</h2>
  htmlContent = htmlContent.replace(/\section\*?{(.*?)}/g, '<h2>$1</h2>');
  // Replace \subsection{...} with <h3>...</h3>
  htmlContent = htmlContent.replace(/\subsection\*?{(.*?)}/g, '<h3>$1</h3>');
  // Replace 	extbf{...} with <strong>...</strong>
  htmlContent = htmlContent.replace(/	extbf{(.*?)}/g, '<strong>$1</strong>');
  // Replace 	extit{...} with <em>...</em>
  htmlContent = htmlContent.replace(/	extit{(.*?)}/g, '<em>$1</em>');
  // Replace \item with <li>...</li>
  htmlContent = htmlContent.replace(/\item\s(.*?)
/g, '<li>$1</li>');
  // Replace \begin{itemize} and \end{itemize} with <ul>...</ul>
  htmlContent = htmlContent.replace(/\begin{itemize}/g, '<ul>');
  htmlContent = htmlContent.replace(/\end{itemize}/g, '</ul>');
    // Replace \begin{enumerate} and \end{enumerate} with <ol>...</ol>
  htmlContent = htmlContent.replace(/\begin{enumerate}/g, '<ol>');
  htmlContent = htmlContent.replace(/\end{enumerate}/g, '</ol>');
  // Remove other LaTeX commands
  htmlContent = htmlContent.replace(/\[a-zA-Z]+(\*)?({.*})?(\[.*\])?/g, '');
  // Replace newlines with <br>
  htmlContent = htmlContent.replace(/
/g, '<br>');

  return htmlContent;
}


export async function getDocumentContent(slug: string): Promise<{ contentHtml: string, title: string }> {
  const fileNames = fs.readdirSync(contentDirectory);
  
  const slugToFileNamePrefix: { [key: string]: string } = {
    'master-policy': '00_master_policy',
    'legislative-brief': '01_legislative_brief',
    'advocacy-brief': '02_advocacy_brief',
    'academic-paper': '03_academic_paper',
    'clinical-brief': '04_clinical_brief',
    'essay': 'autonomy_exit_essay',
  };

  const fileNamePrefix = slugToFileNamePrefix[slug];
  if (!fileNamePrefix) {
    throw new Error(`Content for slug "${slug}" not found.`);
  }

  const fileName = fileNames.find(fn => fn.startsWith(fileNamePrefix));

  if (!fileName) {
    throw new Error(`File for slug "${slug}" not found.`);
  }

  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  let contentHtml: string;
  let title: string;

  if (fileName.endsWith('.md')) {
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    contentHtml = processedContent.toString();
    title = matterResult.data.title || slug;
  } else if (fileName.endsWith('.tex')) {
    const titleMatch = fileContents.match(/	itle{(.*?)}/);
    title = titleMatch ? titleMatch[1] : slug;
    // Remove the preamble and document start/end
    const bodyMatch = fileContents.match(/\begin{document}([\s\S]*)\end{document}/);
    const texBody = bodyMatch ? bodyMatch[1] : fileContents;
    contentHtml = texToHtml(texBody);
  } else {
    contentHtml = '<p>Unsupported file format.</p>';
    title = slug;
  }

  return {
    contentHtml,
    title,
  };
}
