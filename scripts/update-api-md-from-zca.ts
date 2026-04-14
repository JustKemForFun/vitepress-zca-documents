import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ZCA_DIST = path.join(ROOT, "node_modules", "zca-js", "dist");
const ZCA_API_DIR = path.join(ZCA_DIST, "apis");

const DOCS_API_DIR = (lang: "vi" | "en") => path.join(ROOT, "docs", "pages", lang, "apis");

function exists(p: string) {
    try {
        fs.accessSync(p);
        return true;
    } catch {
        return false;
    }
}

function readUtf8(p: string) {
    return fs.readFileSync(p, "utf8");
}

function writeUtf8(p: string, content: string) {
    fs.writeFileSync(p, content, "utf8");
}

function splitTopLevelCommaList(s: string): string[] {
    const out: string[] = [];
    let cur = "";
    let depthAngle = 0;
    let depthParen = 0;
    let depthBracket = 0;
    let depthBrace = 0;

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === "<") depthAngle++;
        else if (ch === ">") depthAngle = Math.max(0, depthAngle - 1);
        else if (ch === "(") depthParen++;
        else if (ch === ")") depthParen = Math.max(0, depthParen - 1);
        else if (ch === "[") depthBracket++;
        else if (ch === "]") depthBracket = Math.max(0, depthBracket - 1);
        else if (ch === "{") depthBrace++;
        else if (ch === "}") depthBrace = Math.max(0, depthBrace - 1);

        if (ch === "," && depthAngle === 0 && depthParen === 0 && depthBracket === 0 && depthBrace === 0) {
            out.push(cur.trim());
            cur = "";
            continue;
        }
        cur += ch;
    }
    const last = cur.trim();
    if (last) out.push(last);
    return out;
}

function parseFactorySignature(dts: string, apiName: string): { paramsRaw: string; returnTypeRaw: string } | null {
    // export declare const xxxFactory: (...) => (a: T, b?: U) => Promise<R>;
    const re = new RegExp(
        `${apiName}Factory:[^=]*=>\\s*\\(([^)]*)\\)\\s*=>\\s*Promise<([\\s\\S]*?)>\\s*;`,
        "m",
    );
    const m = dts.match(re);
    if (!m) return null;
    return { paramsRaw: m[1].trim(), returnTypeRaw: m[2].trim() };
}

function inferCallSignature(apiName: string, paramsRaw: string): string {
    if (!paramsRaw) return `api.${apiName}()`;
    const paramNames = splitTopLevelCommaList(paramsRaw)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => p.split(":")[0].trim())
        .join(", ");
    return `api.${apiName}(${paramNames})`;
}

function paramsToMarkdownBullets(paramsRaw: string): string {
    if (!paramsRaw) return "";
    const parts = splitTopLevelCommaList(paramsRaw);
    const lines = parts
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => {
            const [left, ...rest] = p.split(":");
            const name = (left ?? "").trim();
            const type = rest.join(":").trim();
            if (!name || !type) return null;
            return `* ${name} \`${type}\``;
        })
        .filter(Boolean) as string[];
    return lines.join("\n");
}

function replaceSection(md: string, header: string, newBody: string): string {
    // Replace content after `### Header` until next `### ` (without consuming it)
    const re = new RegExp(`(### ${header}\\s*\\n\\n)([\\s\\S]*?)(?=\\n### |\\n?$)`, "m");
    if (!re.test(md)) return md;
    const body = newBody ? `${newBody}\n` : "";
    return md.replace(re, `$1${body}`);
}

function updateOneFile(mdPath: string, apiName: string, sig: string, paramsMd: string, returnTypeRaw: string) {
    const before = readUtf8(mdPath);
    const lang = mdPath.includes(`${path.sep}vi${path.sep}`) ? "vi" : "en";
    const defaultExampleIntro = lang === "vi" ? "Ví dụ sử dụng" : "Usage example";

    const relatedMatch = before.match(/\n### Related[\s\S]*$/m);
    const relatedBlock = relatedMatch ? relatedMatch[0].trimEnd() : "";

    const examplesIntroMatch = before.match(/### Examples\s*\n\s*([\s\S]*?)\n\s*<<<\s+@\/snippets\/apis\//m);
    const examplesIntroRaw = examplesIntroMatch?.[1]?.trim();
    const examplesIntro = examplesIntroRaw ? examplesIntroRaw.split("\n")[0].trim() : defaultExampleIntro;

    const paramsBlock = paramsMd || "* (no parameters)";
    const next = [
        `# ${apiName}`,
        ``,
        `## ${sig}`,
        ``,
        `### Parameters`,
        ``,
        paramsBlock,
        ``,
        `### Return`,
        ``,
        `\`Promise<${returnTypeRaw}>\``,
        ``,
        `### Types`,
        ``,
        `<<< @/snippets/apis/${apiName}/types.ts`,
        ``,
        `### Examples`,
        ``,
        examplesIntro,
        ``,
        `<<< @/snippets/apis/${apiName}/example.ts`,
        relatedBlock ? `` : undefined,
        relatedBlock || undefined,
        ``,
    ]
        .filter((x): x is string => typeof x === "string")
        .join("\n");

    if (next !== before) writeUtf8(mdPath, next);
    return next !== before;
}

function main() {
    const apisToUpdate = [
        "addPollOptions",
        "findUserByUsername",
        "getAvatarUrlProfile",
        "getCloseFriends",
        "getFriendOnlines",
        "getFullAvatar",
        "getGroupChatHistory",
        "getMultiUsersByPhones",
        "getSettings",
        "getStickerCategoryDetail",
        "rejectFriendRequest",
        "searchSticker",
        "sharePoll",
        "updateActiveStatus",
        "updateArchivedChatList",
        "updateProfileBio",
        "upgradeGroupToCommunity",
        "votePoll",
    ] as const;

    let changed = 0;
    for (const apiName of apisToUpdate) {
        const dtsPath = path.join(ZCA_API_DIR, `${apiName}.d.ts`);
        if (!exists(dtsPath)) {
            console.warn(`Missing d.ts for ${apiName}: ${path.relative(ROOT, dtsPath)}`);
            continue;
        }
        const dts = readUtf8(dtsPath);
        const sigInfo = parseFactorySignature(dts, apiName);
        if (!sigInfo) {
            console.warn(`Cannot parse factory signature for ${apiName}`);
            continue;
        }

        const sig = inferCallSignature(apiName, sigInfo.paramsRaw);
        const paramsMd = paramsToMarkdownBullets(sigInfo.paramsRaw);

        for (const lang of ["vi", "en"] as const) {
            const mdPath = path.join(DOCS_API_DIR(lang), `${apiName}.md`);
            if (!exists(mdPath)) continue;
            const didChange = updateOneFile(mdPath, apiName, sig, paramsMd, sigInfo.returnTypeRaw);
            if (didChange) changed++;
        }
    }

    console.log(`Updated ${changed} markdown files.`);
}

main();
