/**
 * remark plugin: wrap solo markdown images in <figure> with a caption.
 *
 * Authors writing `![caption](src)` expect the alt text to double as a
 * visible figure caption. Default rendering emits `<p><img alt=".."/></p>`
 * which hides the caption and nests the image inside a paragraph. This
 * rewrites paragraphs that contain a single image into a <figure> with
 * a <figcaption>, preserving the image's alt for screen readers.
 *
 * Inline images (text + `![]()` on the same line) are left as-is.
 */

function findSoloImage(paragraph) {
  if (!paragraph.children || paragraph.children.length === 0) return null;
  let image = null;
  for (const child of paragraph.children) {
    if (child.type === 'image') {
      if (image) return null;
      image = child;
      continue;
    }
    if (child.type === 'text' && child.value.trim() === '') continue;
    return null;
  }
  return image;
}

export default function remarkImageFigure() {
  return (tree) => {
    for (const node of tree.children) {
      if (node.type !== 'paragraph') continue;
      const image = findSoloImage(node);
      if (!image) continue;
      const alt = typeof image.alt === 'string' ? image.alt : '';
      node.data = node.data || {};
      node.data.hName = 'figure';
      node.data.hProperties = { className: ['blog-figure'] };
      if (alt.length > 0) {
        node.children = [
          image,
          {
            type: 'paragraph',
            data: {
              hName: 'figcaption',
              hProperties: { className: ['blog-figcaption'] },
            },
            children: [{ type: 'text', value: alt }],
          },
        ];
      }
    }
  };
}
