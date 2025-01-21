import ReactMarkdown from "react-markdown";
import fs from "fs/promises";
import path from "path";

export default async function Documentacion() {
  const filePath = path.join(process.cwd(), "documentacion.md");
  const fileContent = await fs.readFile(filePath, "utf-8");

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{fileContent}</ReactMarkdown>
      </div>
    </div>
  );
}
