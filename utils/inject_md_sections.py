import re
from pathlib import Path
import markdown
import bleach

# Files
TEMPLATE = Path("index.template.html")   # source with @@INJECT markers
OUTPUT   = Path("index.html")            # generated output

# Allowed HTML after Markdown render (sanitize with bleach)
ALLOWED_TAGS = set(bleach.sanitizer.ALLOWED_TAGS).union({
    "h1","h2","h3","h4","h5","h6","p","ul","ol","li","em","strong","hr","br","blockquote","code","pre"
})
ALLOWED_ATTRS = {
    **bleach.sanitizer.ALLOWED_ATTRIBUTES,
    "a": ["href","title","target","rel"]
}

INJECT_RX = re.compile(r"<!--\s*@@INJECT:\s*(.*?)\s*-->")

def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8")

def write_text(p: Path, s: str) -> None:
    p.write_text(s, encoding="utf-8")

def md_to_safe_html(md_text: str) -> str:
    # Render Markdown → HTML
    html = markdown.markdown(md_text, extensions=["extra", "sane_lists", "toc"])
    # Sanitize
    safe_html = bleach.clean(
        html,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRS,
        protocols=["http","https","mailto"]
    )
    # Ensure external links are safe
    safe_html = bleach.linkify(safe_html, skip_tags=["pre","code"])
    return safe_html

def main():
    if not TEMPLATE.exists():
        raise SystemExit(f"Missing template: {TEMPLATE}")

    html = read_text(TEMPLATE)

    def repl(match: re.Match) -> str:
        md_path = Path(match.group(1).strip())
        if not md_path.exists():
            print(f"[WARN] Missing Markdown file: {md_path}")
            return f"<!-- MISSING: {md_path} -->"
        md_text = read_text(md_path)
        return md_to_safe_html(md_text)

    out = INJECT_RX.sub(repl, html)
    write_text(OUTPUT, out)
    print(f"[OK] Wrote {OUTPUT}")

if __name__ == "__main__":
    main()
