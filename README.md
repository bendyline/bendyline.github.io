## Bendyline Site

Static site for Bendyline, LLC. Hosted via GitHub Pages at [bendyline.com](https://bendyline.com).

Run it locally with `npm run web` (serves on http://localhost:3090).

### Layout

- `index.html`: home page (products, open-source projects, latest posts)
- `blog/`: the blog listing
- `support/`, `privacy/`, `gezk/`: inner pages
- `assets/site.css`: shared styles for every page except the generated posts
- `assets/posts.js`: renders post lists from `posts/catalog.json`
- `assets/showcase.js`: the rotating product showcase in the home page hero

### Writing a post

Posts live in `posts/` as a [DocBlocks](https://docblocks.com) workspace. Each post is a Markdown
source in `posts/<name>_files/<name>.md` that DocBlocks renders to `posts/<name>.html`. DocBlocks
also regenerates `posts/catalog.json` and `posts/index.html`, so don't edit those by hand. The one
exception is backdating a post (see below).

1. Write the post in DocBlocks. A `description:` line in its frontmatter, if present, replaces the
   auto-generated excerpt. A `date: YYYY-MM-DD` line is optional; it's only the dateline shown when
   JavaScript is off.
2. Save. DocBlocks refreshes the catalog, and the home page and `/blog/` pick the post up
   automatically. To refresh the catalog from a terminal instead, run
   `docblocks workspace refresh posts`.
3. Add the post's URL to `sitemap.xml`.

The blog orders posts by each catalog entry's `firstPublishedDate`, newest first, and that date is
also the dateline on the post page. DocBlocks stamps it the first time a post appears in the catalog
and moves `lastModifiedDate` forward whenever the content changes. To backdate a post, edit its
`firstPublishedDate` in `posts/catalog.json` by hand. Either a timestamp (`2026-10-28T18:46:42Z`) or a
bare date (`2026-10-27`) works, and DocBlocks keeps the value on later refreshes.
