import { Box, Typography, Link, Stack } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

import { colors } from "../theme";
import Seo from "./Seo";

const PostRow = ({ post }) => {
    return (
        <Link
            component={LinkRouter}
            to={`${post.id}`}
            sx={{
                display: "block",
                color: "inherit",
                textDecoration: "none",
                p: 2,
                mx: -2,
                borderRadius: 1.5,
                transition: "background-color 0.15s ease",
                "&:hover": {
                    backgroundColor: colors.surface,
                    opacity: 1,
                },
                "&:hover .post-title": { color: colors.accent },
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "baseline" }}
                spacing={{ xs: 0.5, sm: 2 }}
            >
                <Typography
                    component="span"
                    sx={{
                        color: colors.muted,
                        fontSize: "0.85rem",
                        flexShrink: 0,
                        minWidth: "6.5rem",
                    }}
                >
                    {post.date}
                </Typography>
                <Typography
                    component="span"
                    className="post-title"
                    sx={{ flex: 1, fontSize: "1.05rem", transition: "color 0.15s ease" }}
                >
                    {post.title}
                </Typography>
                <Box
                    component="span"
                    sx={{
                        color: colors.accent,
                        fontSize: "0.8rem",
                        border: `1px solid ${colors.border}`,
                        borderRadius: 1,
                        px: 1,
                        py: 0.25,
                        flexShrink: 0,
                    }}
                >
                    {post.category}
                </Box>
            </Stack>
        </Link>
    );
};

function DisplayPostsList({ title, posts, path }) {
    const visible = posts.filter((post) => !post.draft);
    return (
        <Box sx={{ maxWidth: 720, mx: "auto" }}>
            <Seo
                title={`Daniel Reguero Blog | ${title}`}
                description={`${visible.length} ${title.toLowerCase()} by Daniel Reguero.`}
                path={path}
            />
            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
                <Box component="span" sx={{ color: colors.accent, mr: 1 }}>#</Box>
                {title}
            </Typography>
            <Typography sx={{ color: colors.muted, mb: 4, fontSize: "0.9rem" }}>
                {visible.length} {visible.length === 1 ? "entry" : "entries"}
            </Typography>
            <Stack divider={<Box sx={{ borderBottom: `1px solid ${colors.border}` }} />}>
                {visible.map((post, i) => (
                    <PostRow post={post} key={i} />
                ))}
            </Stack>
        </Box>
    );
}

export default DisplayPostsList;
