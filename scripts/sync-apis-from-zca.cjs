const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const ZCA_DIST = path.join(ROOT, "node_modules", "zca-js", "dist");
const ZCA_APIS_DTS = path.join(ZCA_DIST, "apis.d.ts");
const ZCA_API_DIR = path.join(ZCA_DIST, "apis");

const DOCS_APIS_DIR = (lang) => path.join(ROOT, "docs", "pages", lang, "apis");
const SNIPPETS_API_DIR = (apiName) => path.join(ROOT, "docs", "snippets", "apis", apiName);

function ensureDir(p) {
    fs.mkdirSync(p, { recursive: true });
}

function exists(p) {
    try {
        fs.accessSync(p);
        return true;
    } catch {
        return false;
    }
}

function readUtf8(p) {
    return fs.readFileSync(p, "utf8");
}

function parseApiNamesFromApisDts(dts) {
    const m = dts.match(/export declare class API \{([\s\S]*?)constructor\(/);
    if (!m) throw new Error("Unable to parse API class from apis.d.ts");
    const body = m[1];
    const names = [...body.matchAll(/^\s*([a-zA-Z_$][\w$]*):\s/gm)]
        .map((x) => x[1])
        .filter((n) => !["zpwServiceMap", "listener"].includes(n));
    return names;
}

function exportedTypeNamesFromApiDts(dts) {
    return [...dts.matchAll(/export type ([A-Za-z_$][\w$]*)\s*=/g)].map((m) => m[1]);
}

function makeTypesSnippet(apiName, typeNames) {
    if (typeNames.length === 0) {
        return `export type ${apiName[0].toUpperCase() + apiName.slice(1)}Response = unknown;\n`;
    }
    return `export type {\n${typeNames.map((t) => `    ${t},`).join("\n")}\n} from "zca-js";\n`;
}

function makeExampleSnippet(apiName) {
    const commonHeader = `import { Zalo } from "zca-js";\n\nconst zalo = new Zalo();\nconst api = await zalo.loginQR();\n\n`;

    switch (apiName) {
        case "addPollOptions":
            return (
                commonHeader +
                `// Add options to an existing poll\nawait api.addPollOptions({\n    pollId: 123,\n    options: [{ voted: false, content: "Option mới" }],\n    votedOptionIds: [],\n});\n`
            );
        case "findUserByUsername":
            return commonHeader + `const user = await api.findUserByUsername("some.username");\nconsole.log(user);\n`;
        case "getAvatarUrlProfile":
            return commonHeader + `const avatars = await api.getAvatarUrlProfile(["123456789", "987654321"]);\nconsole.log(avatars);\n`;
        case "getCloseFriends":
            return commonHeader + `const closeFriends = await api.getCloseFriends();\nconsole.log(closeFriends);\n`;
        case "getFriendOnlines":
            return commonHeader + `const status = await api.getFriendOnlines();\nconsole.log(status);\n`;
        case "getFullAvatar":
            return commonHeader + `const avatar = await api.getFullAvatar("123456789");\nconsole.log(avatar);\n`;
        case "getGroupChatHistory":
            return commonHeader + `const history = await api.getGroupChatHistory("123456789", 20);\nconsole.log(history.groupMsgs);\n`;
        case "getMultiUsersByPhones":
            return commonHeader + `const users = await api.getMultiUsersByPhones(["+84901234567", "+84907654321"]);\nconsole.log(users);\n`;
        case "getSettings":
            return commonHeader + `const settings = await api.getSettings();\nconsole.log(settings);\n`;
        case "getStickerCategoryDetail":
            return commonHeader + `const stickers = await api.getStickerCategoryDetail(1);\nconsole.log(stickers);\n`;
        case "rejectFriendRequest":
            return commonHeader + `await api.rejectFriendRequest("123456789");\n`;
        case "searchSticker":
            return commonHeader + `const stickers = await api.searchSticker("hello", 10);\nconsole.log(stickers);\n`;
        case "sharePoll":
            return commonHeader + `await api.sharePoll(123);\n`;
        case "updateActiveStatus":
            return commonHeader + `const res = await api.updateActiveStatus(true);\nconsole.log(res.status);\n`;
        case "updateArchivedChatList":
            return (
                commonHeader +
                `// Update archived conversations\nawait api.updateArchivedChatList(true, { id: "123456789", type: 0 as any });\n// Note: type is ThreadType (User/Group)\n`
            );
        case "updateProfileBio":
            return commonHeader + `await api.updateProfileBio("Hello from zca-js");\n`;
        case "upgradeGroupToCommunity":
            return commonHeader + `await api.upgradeGroupToCommunity("123456789");\n`;
        case "votePoll":
            return commonHeader + `const res = await api.votePoll(123, 1);\nconsole.log(res.options);\n`;
        default:
            return commonHeader + `// TODO: add example\nawait api.${apiName}();\n`;
    }
}

function makeApiMarkdown(lang, apiName, signature) {
    const isVi = lang === "vi";
    const exampleIntro =
        apiName === "updateArchivedChatList"
            ? isVi
                ? "Cập nhật trạng thái lưu trữ hội thoại"
                : "Update archived conversations"
            : isVi
                ? "Ví dụ sử dụng"
                : "Usage example";

    const related = apiName.toLowerCase().includes("poll") ? `\n### Related\n\n* [PollDetail](../models/Board)\n` : "";

    return `# ${apiName}\n\n## ${signature}\n\n### Parameters\n\n- ...\n\n### Return\n\n\`Promise<...>\`\n\n### Types\n\n<<< @/snippets/apis/${apiName}/types.ts\n\n### Examples\n\n${exampleIntro}\n\n<<< @/snippets/apis/${apiName}/example.ts\n${related}`;
}

function inferSignatureFromApiDts(apiName, dts) {
    const re = new RegExp(`${apiName}Factory:[^=]*=>\\s*\\(([^)]*)\\)\\s*=>\\s*Promise<`, "m");
    const m = dts.match(re);
    const params = (m && m[1] ? m[1].trim() : "") || "";
    if (!params) return `api.${apiName}()`;
    const paramNames = params
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => p.split(":")[0].trim())
        .join(", ");
    return `api.${apiName}(${paramNames})`;
}

function main() {
    if (!exists(ZCA_APIS_DTS)) throw new Error(`Missing ${ZCA_APIS_DTS}`);

    const apisDts = readUtf8(ZCA_APIS_DTS);
    const apiNames = parseApiNamesFromApisDts(apisDts);

    const missingByLang = { vi: [], en: [] };
    for (const lang of ["vi", "en"]) {
        const dir = DOCS_APIS_DIR(lang);
        const existing = new Set(
            fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => path.basename(f, ".md")),
        );
        missingByLang[lang] = apiNames.filter((n) => !existing.has(n));
    }

    const targets = [...new Set([...missingByLang.vi, ...missingByLang.en])].sort((a, b) => a.localeCompare(b));
    if (targets.length === 0) {
        console.log("No missing API pages. Nothing to do.");
        return;
    }

    for (const apiName of targets) {
        const apiDtsPath = path.join(ZCA_API_DIR, `${apiName}.d.ts`);
        const apiDts = exists(apiDtsPath) ? readUtf8(apiDtsPath) : "";
        const sig = apiDts ? inferSignatureFromApiDts(apiName, apiDts) : `api.${apiName}()`;

        const snippetDir = SNIPPETS_API_DIR(apiName);
        ensureDir(snippetDir);

        const typesPath = path.join(snippetDir, "types.ts");
        if (!exists(typesPath)) {
            const typeNames = apiDts ? exportedTypeNamesFromApiDts(apiDts) : [];
            fs.writeFileSync(typesPath, makeTypesSnippet(apiName, typeNames), "utf8");
            console.log(`+ snippets: ${path.relative(ROOT, typesPath)}`);
        }

        const examplePath = path.join(snippetDir, "example.ts");
        if (!exists(examplePath)) {
            fs.writeFileSync(examplePath, makeExampleSnippet(apiName), "utf8");
            console.log(`+ snippets: ${path.relative(ROOT, examplePath)}`);
        }

        for (const lang of ["vi", "en"]) {
            const mdPath = path.join(DOCS_APIS_DIR(lang), `${apiName}.md`);
            if (exists(mdPath)) continue;
            fs.writeFileSync(mdPath, makeApiMarkdown(lang, apiName, sig), "utf8");
            console.log(`+ docs: ${path.relative(ROOT, mdPath)}`);
        }
    }

    console.log(`Done. Added ${targets.length} API pages (vi/en) + snippets.`);
}

main();
