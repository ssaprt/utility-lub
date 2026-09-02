const normalizeSource = (source: string) =>
    source.replaceAll("\r\n", "\n").replaceAll("\r", "\n").trim();

const isHtml = (source: string) => /^\s*<\/?[a-z][^>]*>/i.test(source);

const isCss = (source: string) => {
    if (!source.includes("{") || !source.includes("}")) {
        return false;
    }

    return /(?:^|})\s*(?:@[^;{]+|[^{}]+)\s*\{/m.test(source);
};

const findDeclarationColon = (line: string) => {
    let quote: "'" | '"' | null = null;
    let escaped = false;
    let parentheses = 0;

    for (let index = 0; index < line.length; index++) {
        const character = line[index];

        if (escaped) {
            escaped = false;
            continue;
        }

        if (character === "\\") {
            escaped = true;
            continue;
        }

        if (quote) {
            if (character === quote) {
                quote = null;
            }

            continue;
        }

        if (character === "'" || character === '"') {
            quote = character;
            continue;
        }

        if (character === "(") {
            parentheses++;
            continue;
        }

        if (character === ")") {
            parentheses = Math.max(0, parentheses - 1);
            continue;
        }

        if (character === ":" && parentheses === 0) {
            return index;
        }
    }

    return -1;
};

const normalizeCssLine = (line: string, declaration: boolean) => {
    const normalized = line.trim();

    if (!declaration) {
        return normalized;
    }

    const colon = findDeclarationColon(normalized);

    if (colon < 0) {
        return normalized;
    }

    const formatted = `${normalized.slice(0, colon).trim()}: ${normalized
        .slice(colon + 1)
        .trimStart()}`;

    return formatted.endsWith(";") ? formatted : `${formatted};`;
};

const formatCss = (source: string) => {
    const lines: string[] = [];
    let current = "";
    let indent = 0;
    let quote: "'" | '"' | null = null;
    let escaped = false;
    let inComment = false;
    let parentheses = 0;
    let brackets = 0;

    const pushLine = (declaration = false) => {
        const line = normalizeCssLine(current, declaration);

        if (line) {
            lines.push(`${"    ".repeat(indent)}${line}`);
        }

        current = "";
    };

    for (let index = 0; index < source.length; index++) {
        const character = source[index];
        const nextCharacter = source[index + 1];

        if (inComment) {
            current += character;

            if (character === "*" && nextCharacter === "/") {
                current += nextCharacter;
                index++;
                inComment = false;
            }

            continue;
        }

        if (escaped) {
            current += character;
            escaped = false;
            continue;
        }

        if (character === "\\") {
            current += character;
            escaped = true;
            continue;
        }

        if (quote) {
            current += character;

            if (character === quote) {
                quote = null;
            }

            continue;
        }

        if (character === "'" || character === '"') {
            current += character;
            quote = character;
            continue;
        }

        if (character === "/" && nextCharacter === "*") {
            current += "/*";
            index++;
            inComment = true;
            continue;
        }

        if (character === "(") {
            parentheses++;
            current += character;
            continue;
        }

        if (character === ")") {
            parentheses = Math.max(0, parentheses - 1);
            current += character;
            continue;
        }

        if (character === "[") {
            brackets++;
            current += character;
            continue;
        }

        if (character === "]") {
            brackets = Math.max(0, brackets - 1);
            current += character;
            continue;
        }

        const structural = parentheses === 0 && brackets === 0;

        if (structural && character === "{") {
            current = `${current.trim()} {`;
            pushLine(false);
            indent++;
            continue;
        }

        if (structural && character === "}") {
            pushLine(true);
            indent = Math.max(0, indent - 1);
            lines.push(`${"    ".repeat(indent)}}`);
            continue;
        }

        if (structural && character === ";") {
            current = `${current.trim()};`;
            pushLine(true);
            continue;
        }

        if (/\s/.test(character)) {
            if (current && !current.endsWith(" ")) {
                current += " ";
            }

            continue;
        }

        current += character;
    }

    pushLine(indent > 0);

    return lines
        .join("\n")
        .replace(/}\n(?=[^}\s])/g, "}\n\n")
        .trim();
};

const voidElements = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);

const formatHtml = (source: string) => {
    const tokens = source.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/g);

    if (!tokens) {
        return source;
    }

    const lines: string[] = [];
    let indent = 0;

    for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index];
        const value = token.trim();

        if (!value) {
            continue;
        }

        if (!value.startsWith("<")) {
            lines.push(`${"    ".repeat(indent)}${value.replace(/\s+/g, " ")}`);
            continue;
        }

        const closing = /^<\//.test(value);
        const special = /^<!|^<\?/.test(value);
        const tagName = value.match(/^<\/?\s*([\w-]+)/)?.[1]?.toLowerCase();
        const selfClosing =
            /\/>$/.test(value) || Boolean(tagName && voidElements.has(tagName));

        const nextValue = tokens[index + 1]?.trim();
        const closesImmediately = Boolean(
            tagName &&
            !closing &&
            !special &&
            !selfClosing &&
            nextValue?.toLowerCase() === `</${tagName}>`,
        );

        if (closesImmediately) {
            lines.push(`${"    ".repeat(indent)}${value}${nextValue}`);
            index++;
            continue;
        }

        if (closing) {
            indent = Math.max(0, indent - 1);
        }

        lines.push(`${"    ".repeat(indent)}${value}`);

        if (!closing && !special && !selfClosing) {
            indent++;
        }
    }

    return lines.join("\n").trim();
};

export const formatCodeForClipboard = (source: string) => {
    const normalized = normalizeSource(source);

    if (!normalized) {
        return "";
    }

    if (isHtml(normalized)) {
        return formatHtml(normalized);
    }

    if (isCss(normalized)) {
        return formatCss(normalized);
    }

    return normalized;
};
