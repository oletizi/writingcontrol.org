/**
 * remark plugin: strip the first H1 from rendered markdown output.
 *
 * Layouts already render the title from frontmatter, so the markdown
 * body's leading `# Title` would appear as a duplicate right under the
 * masthead. This plugin drops that first H1 from the rendered tree
 * while leaving the source `.md` file intact, so authors can keep
 * writing `# Title` at the top of their drafts (deskwork's `outline`
 * scaffold also writes one at file creation).
 *
 * Only the first top-level H1 is removed. Any later H1s are preserved.
 */

export default function remarkStripFirstH1() {
  return (tree) => {
    const children = tree.children;
    const idx = children.findIndex(
      (n) => n.type === 'heading' && n.depth === 1,
    );
    if (idx < 0) return;
    children.splice(idx, 1);
  };
}
