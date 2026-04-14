import fs from "node:fs";
import path from "node:path";

const SNIPPETS_DIR = path.resolve(process.cwd(), "docs", "snippets", "apis");
const APIS_DIR = path.resolve(process.cwd(), "docs", "pages", "vi", "apis");

function getApiList() {
    return fs.readdirSync(APIS_DIR).filter((file) => file.endsWith(".md")).map((file) => {
        return path.basename(file, ".md");
    });
}

function prepareApiSnippets(apiName: string) {
    // create 2 file, index.ts and types.ts
    const apiSnippetDir = path.resolve(SNIPPETS_DIR, apiName);
    if (!fs.existsSync(apiSnippetDir)) {
        fs.mkdirSync(apiSnippetDir, { recursive: true });
    }
    const indexTsPath = path.resolve(apiSnippetDir, "index.ts");
    const typesTsPath = path.resolve(apiSnippetDir, "types.ts");

    const indexTsContent = `import { ThreadType } from "zca-js";\n\n// Your code here\n`;
    const typesTsContent = `export type ${apiName.charAt(0).toUpperCase() + apiName.slice(1)}Response = unknown;\n`;

    if (!fs.existsSync(indexTsPath)) {
        fs.writeFileSync(indexTsPath, indexTsContent, "utf-8");
    }

    if (!fs.existsSync(typesTsPath)) {
        fs.writeFileSync(typesTsPath, typesTsContent, "utf-8");
    }
}

const apiList = getApiList();
apiList.forEach((apiName) => {
    prepareApiSnippets(apiName);
});
