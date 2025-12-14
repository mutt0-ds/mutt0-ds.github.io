"""This script can be used for syncing the book Notion database to the blog's Books page"""

# pip install notion-client pyyaml python-dotenv

import os
import yaml
from notion_client import Client
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("DATABASE_ID")
OUTPUT_DIR = Path("../../../content/todo")
notion = Client(auth=NOTION_TOKEN)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def get_text(prop):
    if prop["type"] == "title":
        return "".join([t["plain_text"] for t in prop["title"]])
    if prop["type"] == "rich_text":
        return "".join([t["plain_text"] for t in prop["rich_text"]])
    return ""


def get_blocks_as_md(block_id, indent=0):
    """Recursively converts Notion blocks into Markdown text"""
    md_lines = []
    children = notion.blocks.children.list(block_id=block_id).get("results", [])
    prefix = " " * indent

    for b in children:
        t = b["type"]
        data = b[t]

        # text blocks
        if t in ("paragraph", "heading_1", "heading_2", "heading_3"):
            text = "".join([r["plain_text"] for r in data.get("rich_text", [])])
            if not text.strip():
                continue
            if t == "heading_1":
                md_lines.append(f"# {text}\n")
            elif t == "heading_2":
                md_lines.append(f"## {text}\n")
            elif t == "heading_3":
                md_lines.append(f"### {text}\n")
            else:
                md_lines.append(f"{text}\n")

        # lists
        elif t == "bulleted_list_item":
            text = "".join([r["plain_text"] for r in data.get("rich_text", [])])
            md_lines.append(f"{prefix}- {text}")
        elif t == "numbered_list_item":
            text = "".join([r["plain_text"] for r in data.get("rich_text", [])])
            md_lines.append(f"{prefix}1. {text}")

        # quotes, toggles, etc.
        elif t == "quote":
            text = "".join([r["plain_text"] for r in data.get("rich_text", [])])
            md_lines.append(f"> {text}")

        # images
        elif t == "image":
            if data["type"] == "external":
                url = data["external"]["url"]
            else:
                url = data["file"]["url"]
            md_lines.append(f"![image]({url})")

        # recurse for children
        if b.get("has_children"):
            md_lines.append(get_blocks_as_md(b["id"], indent=indent + 2))

    return "\n".join(md_lines)


def main():
    data_source = notion.databases.retrieve(database_id=DATABASE_ID).get('data_sources')[0]['id']
    results = notion.data_sources.query(data_source_id=data_source).get("results", [])

    for p in results:
        props = p["properties"]

        title = get_text(props["Name"])
        author = [a["name"] for a in props.get("Author", {}).get("multi_select", [])]
        tags = [t["name"] for t in props.get("🏷 Tag", {}).get("multi_select", [])]
        summary = get_text(props.get("In a Nutshell", {"type": "rich_text", "rich_text": []}))
        score = props.get("Score /5", {}).get("select", {}).get("name", "")
        finished_date = props.get("Finito Il", {}).get("date", {}).get("start", "")

        cover = ""
        if files := props.get("Cover", {}).get("files"):
            f = files[0]
            cover = f[f["type"]]["url"]

        # fetch page content (main blocks)
        page_content_md = get_blocks_as_md(p["id"])

        frontmatter = {
            "title": title,
            "author": ", ".join(author),
            "image": cover,
            "badges": tags,
            "score": score,
            "finished": finished_date,
            "summary": summary,
            "showInHome": False,
        }

        filename = title.lower().replace(" ", "-").replace(":", "").replace("/", "-") + ".md"
        md_path = OUTPUT_DIR / filename

        # ✅ Skip if already exported
        if md_path.exists():
            print(f"⏩ Skipping {title} (already exists)")
            continue

        content = f"---\n{yaml.dump(frontmatter, sort_keys=False)}---\n\n"
        if summary:
            content += f"_{summary}_\n\n"
        content += page_content_md + "\n"

        md_path.write_text(content, encoding="utf-8")
        print(f"✅ Exported {title}")
   
if __name__ == "__main__":
    main()
