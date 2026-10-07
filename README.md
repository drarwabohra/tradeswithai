# TradesWithAI

Next.js App Router storefront for downloadable stock and crypto screeners.

Product descriptions, prices, requirements, and media paths live in `src/data/products.json`. Contact details and public UPI payee details live in `src/data/site.json`. Put product media in `public/products/` and keep JSON paths consistent with actual filenames. Existing paths are preserved by this bundle because the media bytes were not included in the export.

Run `npm run dev` for local development. Before accepting payments, follow `OPERATIONS.md`: install PostgreSQL dependencies, apply the migration, configure secrets and the real merchant UPI ID, schedule the outbox worker, and connect a durable, authenticated webhook receiver.

The storefront uses a shared responsive design, market filters, CSS animations, and one-time scroll reveals. Reduced-motion preferences are respected and content remains visible without JavaScript. Product images use Next.js optimization; demo videos load on demand and use a compressed `poster.webp` in the same folder as each video. Keep that poster up to date when replacing product media.

Checkout creates a server-issued order, presents its snapshotted amount/payee, then records the buyer's UPI reference. A recorded reference means payment verification is pending. The operator must check the actual bank credit before sending files. Webhook notifications retry separately and do not determine whether an order exists.

For release, run `npm run lint`, `npx tsc --noEmit`, and `npm run build`, then complete the staging and browser checks in `OPERATIONS.md`. Product and checkout shells remain static; order endpoints run on the server. Product JSON changes require a rebuild.
