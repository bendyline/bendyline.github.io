// Renders blog post lists from the catalog DocBlocks writes to /posts/catalog.json,
// so a newly saved post shows up here without editing this site's HTML.
//
// Usage: <ol data-posts data-limit="3" data-heading="3"></ol>
//   data-limit    show only the newest N posts (omit for all)
//   data-heading  heading level for post titles (defaults to 2)
(function () {
    const CATALOG_URL = "/posts/catalog.json";
    const WORDS_PER_MINUTE = 225;

    // DocBlocks stamps firstPublishedDate and lastModifiedDate as timestamps
    // (2026-10-29T02:19:10Z), but hand-backfilled ones may be bare dates (2026-10-27).
    // A bare date is a calendar day; a timestamp is shown in the reader's time zone.
    function parseDate(value) {
        if (typeof value !== "string") return null;
        const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
        const date = day ? new Date(Date.UTC(Number(day[1]), Number(day[2]) - 1, Number(day[3]))) : new Date(value);
        if (Number.isNaN(date.getTime())) return null;
        return { value, date, timeZone: day ? "UTC" : undefined };
    }

    function formatDate(parsed) {
        return parsed.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: parsed.timeZone,
        });
    }

    function timeElement(parsed) {
        const time = element("time", null, formatDate(parsed));
        time.dateTime = parsed.value;
        return time;
    }

    // Newest first; undated posts go last. Array#sort is stable, so ties keep catalog order.
    function newestFirst(left, right) {
        const leftTime = left.published ? left.published.date.getTime() : -Infinity;
        const rightTime = right.published ? right.published.date.getTime() : -Infinity;
        return rightTime - leftTime || 0;
    }

    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function renderPost({ entry, href, published, modified }, headingLevel) {
        const item = element("li");
        const article = element("article", "post");

        const meta = element("p", "post-meta");
        if (published) meta.append(timeElement(published));
        const minutes = Math.max(1, Math.round((entry.wordCount || 0) / WORDS_PER_MINUTE));
        meta.append(element("span", "post-reading", `${minutes} min read`));
        // Only worth mentioning when the edit landed on a later day than publication.
        if (published && modified && modified.date > published.date && formatDate(modified) !== formatDate(published)) {
            const updated = element("span", "post-updated", "Updated ");
            updated.append(timeElement(modified));
            meta.append(updated);
        }

        const title = element(`h${headingLevel}`, "post-title");
        const link = element("a", null, entry.title);
        link.href = href;
        title.append(link);

        article.append(meta, title);
        const summary = entry.description || entry.excerpt;
        if (summary) article.append(element("p", "post-excerpt", summary));
        article.append(element("span", "post-more", "Read post →"));

        item.append(article);
        return item;
    }

    function showStatus(list, message) {
        const status = element("p", "posts-status", message + " ");
        const link = element("a", "text-link", "Browse the post index");
        link.href = "/posts/";
        status.append(link, ".");
        list.replaceWith(status);
    }

    async function render(list) {
        const limit = Number(list.dataset.limit) || Infinity;
        const headingLevel = Number(list.dataset.heading) || 2;
        try {
            const catalogUrl = new URL(CATALOG_URL, location.href);
            const response = await fetch(catalogUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const catalog = await response.json();

            const posts = (catalog.documents || [])
                .map((entry) => ({
                    entry,
                    href: new URL(entry.path, catalogUrl),
                    // `date` is the frontmatter field older catalogs sorted by.
                    published: parseDate(entry.firstPublishedDate) || parseDate(entry.date),
                    modified: parseDate(entry.lastModifiedDate),
                }))
                .filter(({ entry, href }) => entry.title && href.origin === catalogUrl.origin)
                .sort(newestFirst)
                .slice(0, limit);

            if (posts.length === 0) {
                showStatus(list, "No posts yet. Check back soon.");
                return;
            }
            list.replaceChildren(...posts.map((post) => renderPost({ ...post, href: post.href.href }, headingLevel)));
            list.removeAttribute("aria-busy");
        } catch (error) {
            console.error("Could not load posts:", error);
            showStatus(list, "Posts couldn't be loaded right now.");
        }
    }

    document.querySelectorAll("[data-posts]").forEach(render);
})();
