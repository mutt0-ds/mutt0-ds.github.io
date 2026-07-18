import { getLinkIcon } from './link-icons';

function walk(node: any, visit: (node: any) => void) {
  if (!node.children) return;
  for (const child of node.children) {
    visit(child);
    walk(child, visit);
  }
}

/** Glues a curated brand icon in front of known links inside markdown post
 * bodies — the same icon set IconLink.astro uses for hardcoded links, so
 * "mention a link, get its icon" works the same whether the link lives in
 * a .md file or a template. */
export default function rehypeLinkIcons() {
  return (tree: any) => {
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'a') return;
      const href = node.properties?.href;
      const icon = getLinkIcon(typeof href === 'string' ? href : undefined);
      if (!icon) return;

      const existingClass = Array.isArray(node.properties.className) ? node.properties.className : [];
      node.properties.className = [...existingClass, 'icon-link'];

      node.children.unshift({
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['link-icon', `link-icon-${icon.key}`, ...(icon.chip ? ['link-icon-chip'] : [])],
        },
        children: [{ type: 'raw', value: icon.svg }],
      });
    });
  };
}
