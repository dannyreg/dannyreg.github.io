import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import matter from 'gray-matter';
import { Box, Typography, Link, Stack } from "@mui/material";
import { useParams, Link as LinkRouter } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { colors } from "../theme";
import { SITE_NAME, SITE_URL } from "../config";
import Seo from "./Seo";

const readingTime = (text) => {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return `~${time} min read`;
}

const markdownSx = {
    color: colors.text,
    fontSize: "1.02rem",
    lineHeight: 1.8,
    "& p": { my: 2 },
    "& h2": { mt: 5, mb: 2, fontSize: "1.6rem", fontWeight: 700 },
    "& h3": { mt: 4, mb: 1.5, fontSize: "1.3rem", fontWeight: 700 },
    "& ul, & ol": { pl: 3, my: 2 },
    "& li": { mb: 0.75 },
    "& hr": { border: "none", borderTop: `1px solid ${colors.border}`, my: 4 },
    "& img": { borderRadius: 1, my: 2 },
};

function DisplayPost({ type }) {
    const params = useParams();
    const [markdownContent, setMarkdownContent] = useState(null);
    const [markdownError, setMarkdownError] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [summary, setSummary] = useState("");
    useEffect(() => {
        if (type === "blogs" || type === "projects") {
            const fetchMarkdownFile = async () => {
                const mdFile = await import(`../posts/${type}/${params.id}.md`);
                const markdown = await fetch(mdFile.default).then(res => res.text());
                return matter(markdown);
            };
            fetchMarkdownFile().then(matterObj => {
                setMarkdownContent(matterObj.content);
                setTitle(matterObj.data.title);
                setDate(matterObj.data.date);
                setSummary(matterObj.data.summary || "");
            }).catch(err => {
                setMarkdownError(true);
                console.log({ err });
            })
            return;
        }
    }, [type, params.id])

    if (markdownError) {
        return (
            <Box sx={{ textAlign: "center", py: 6 }}>
                <Seo
                    title="Daniel Reguero Blog | Post Not Found"
                    description="Sorry, couldn't find this post."
                    path={`/${type}/${params.id}`}
                />
                <Typography variant="h4" component="h1" sx={{ mb: 1 }}>Not Found</Typography>
                <Typography sx={{ color: colors.muted, mb: 3 }}>
                    Sorry, couldn't find this post :&#40;
                </Typography>
                <Link component={LinkRouter} to={`/${type}`} color="secondary">
                    &larr; back to {type}
                </Link>
            </Box>
        )
    }

    if (!(title && date && markdownContent)) {
        return (
            <Typography sx={{ color: colors.muted, textAlign: "center", py: 8 }}>
                loading
            </Typography>
        );
    }

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: summary || undefined,
        datePublished: date,
        author: { "@type": "Person", name: SITE_NAME },
    };

    return (
        <Box sx={{ maxWidth: 720, mx: "auto" }}>
            <Seo
                title={`Daniel Reguero Blog | ${title}`}
                description={summary || `${title} — ${SITE_NAME}`}
                path={`/${type}/${params.id}`}
                type="article"
                publishedDate={date}
                jsonLd={articleJsonLd}
            />
            <Box sx={{ mb: 4, pb: 3, borderBottom: `1px solid ${colors.border}` }}>
                <Link
                    component={LinkRouter}
                    to={`/${type}`}
                    color="secondary"
                    sx={{ fontSize: "0.85rem", display: "inline-block", mb: 2 }}
                >
                    &larr; {type}
                </Link>
                <Typography variant="h4" component="h1" sx={{ mb: 1.5, fontSize: { xs: "1.8rem", sm: "2.1rem" } }}>
                    {title}
                </Typography>
                <Stack direction="row" spacing={1.5} sx={{ color: colors.muted, fontSize: "0.85rem" }}>
                    <span>{date}</span>
                    <span>&middot;</span>
                    <span>{readingTime(markdownContent)}</span>
                </Stack>
            </Box>
            <Box sx={markdownSx}>
                <ReactMarkdown
                    components={{
                        blockquote: ({ node, ...props }) => (
                            <blockquote
                                {...props}
                                style={{
                                    borderLeft: `3px solid ${colors.accent}`,
                                    color: colors.muted,
                                    fontSize: "95%",
                                    margin: "2em 0",
                                    padding: "0.25em 1.5em",
                                }}
                            />
                        ),
                        a: ({ node, href, ...props }) => {
                            const isExternal = /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);
                            const extraProps = isExternal
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {};
                            return <Link href={href} color="secondary" underline="always" {...extraProps} {...props} />;
                        },
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const codeString = (Array.isArray(children) ? children.join('') : String(children ?? '')).replace(/\n$/, '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={codeString}
                                    style={a11yDark}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{ borderRadius: 6, border: `1px solid ${colors.border}`, fontSize: "0.9rem" }}
                                    {...props}
                                />
                            ) : (
                                <SyntaxHighlighter
                                    children={codeString}
                                    style={a11yDark}
                                    PreTag="span"
                                    customStyle={{ padding: "2px 6px", borderRadius: 4, backgroundColor: "#2c3437", fontSize: "0.9em" }}
                                    {...props}
                                />
                            )
                        },
                        img: ({ node, ...props }) => <img alt={props.alt} style={{ maxWidth: "100%" }} {...props} />,
                    }}
                    children={markdownContent}
                />
            </Box>
        </Box>
    );
}

export default DisplayPost;
