import { Helmet } from "react-helmet-async";

import { SITE_URL, SITE_NAME } from "../config";

const DEFAULT_IMAGE = `${SITE_URL}/favicon.ico`;

function Seo({ title, description, path = "/", type = "website", publishedDate, jsonLd }) {
    const url = `${SITE_URL}${path}`;
    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            <link rel="canonical" href={url} />

            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:image" content={DEFAULT_IMAGE} />
            {type === "article" && publishedDate && (
                <meta property="article:published_time" content={publishedDate} />
            )}

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={DEFAULT_IMAGE} />

            {jsonLd && (
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            )}
        </Helmet>
    );
}

export default Seo;
