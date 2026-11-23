## Bendyline Site

Static site for Bendyline, LLC. Hosted via GitHub Pages at [bendyline.com](https://bendyline.com).

Run it locally with `npm run web` (serves on http://localhost:3090).

### Layout

- `index.html`: home page (products, open-source projects, latest posts)
- `blog/`: the blog listing
- `support/`, `privacy/`, `terms/`, `gezk/`: inner pages
- `assets/site.css`: shared styles for every page except the generated posts
- `assets/posts.js`: renders post lists from `posts/catalog.json`
- `assets/showcase.js`: the rotating product showcase in the home page hero

### Store badges

The "On the App Store and Google Play" section of the home page links each app's store listings. The badges in
`assets/stores/` are the stores' own artwork: size them only through `.store-badge img` in
`site.css`, and never recolor or crop them.

A listing that is not live yet is a `.store-pending` plate ("Coming soon") with its live badge in a
comment beside it. `grep -n "store:" index.html` finds them. When a store approves the app:

1. Delete that store's `pending` comment and plate, and uncomment the `live` badge below it.
2. For the Microsoft Store, replace `STORE_ID` with the product's Store ID from Partner Center.
3. If the trademark line under the section does not name that store yet, add it (Mac App Store is
   a service mark of Apple Inc.; Microsoft Store is a trademark of the Microsoft group of companies).

docblocks.com carries the same markers; its steps are in `packages/site/README.md` in the DocBlocks
repository. Pending today: `store:mac-app-store` and `store:microsoft-store`, both for DocBlocks.

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
