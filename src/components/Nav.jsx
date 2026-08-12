import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { Link as LinkRouter } from "react-router-dom";

import { colors } from "../theme";

const navLinks = [
    { label: "/blogs", to: "/blogs", match: "/blogs" },
    { label: "/projects", to: "/projects", match: "/projects" },
    { label: "/about", to: "/about", match: "/about" },
    { label: "/github", to: "https://github.com/dannyreg", external: true },
    { label: "/rss", to: "/feed.xml", external: true },
];

const NavLink = ({ link, pathname }) => {
    const active = link.match && pathname.startsWith(link.match);
    const extraProps = link.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
    return (
        <Link
            component={LinkRouter}
            to={link.to}
            {...extraProps}
            sx={{
                fontSize: "1rem",
                color: active ? colors.accent : colors.muted,
                borderBottom: active
                    ? `1px solid ${colors.accent}`
                    : "1px solid transparent",
                pb: "2px",
                "&:hover": { color: colors.accent, opacity: 1 },
            }}
        >
            {link.label}
        </Link>
    );
};

const Nav = () => {
    const { pathname } = useLocation();
    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Box
                sx={{
                    borderBottom: `1px solid ${colors.border}`,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(29, 31, 33, 0.8)",
                }}
            >
                <Container maxWidth="md">
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={{ xs: 1, sm: 0 }}
                        sx={{ py: { xs: 1.25, sm: 1.75 } }}
                    >
                        <Link
                            component={LinkRouter}
                            to="/"
                            sx={{ fontSize: "1rem", color: colors.text, "&:hover": { color: colors.accent, opacity: 1 } }}
                        >
                            <Box component="span" sx={{ color: colors.accent, mr: 0.5 }}>~/</Box>
                            home
                        </Link>
                        <Stack
                            direction="row"
                            alignItems="center"
                            useFlexGap
                            flexWrap="wrap"
                            justifyContent="center"
                            sx={{ columnGap: { xs: 2, sm: 2.5 }, rowGap: 0.5 }}
                        >
                            {navLinks.map((link, i) => (
                                <NavLink link={link} pathname={pathname} key={i} />
                            ))}
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ flex: 1, py: { xs: 4, sm: 6 } }}>
                <Outlet />
            </Container>

            <Box sx={{ borderTop: `1px solid ${colors.border}` }}>
                <Container maxWidth="md">
                    <Typography
                        sx={{ py: 3, fontSize: "0.85rem", color: colors.muted, textAlign: "center" }}
                    >
                        &copy; {new Date().getFullYear()} Daniel Reguero &middot; built with react
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Nav;
