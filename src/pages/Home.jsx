import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import routes from "../routes";
import { colors } from "../theme";

const HomeLink = ({ route }) => {
    const { name, path, newTab } = route;
    const extraProps = newTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
    return (
        <Link
            component={LinkRouter}
            to={path}
            color="secondary"
            {...extraProps}
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "1.15rem",
                width: "fit-content",
                transition: "transform 0.15s ease, opacity 0.15s ease",
                "& .arrow": { color: colors.muted, transition: "color 0.15s ease" },
                "&:hover": { transform: "translateX(6px)", opacity: 1 },
                "&:hover .arrow": { color: colors.accent },
            }}
        >
            <span className="arrow">&rarr;</span>
            <span>{name}{newTab ? " ↗" : ""}</span>
        </Link>
    );
};

const Home = () => {
    return (
        <Container maxWidth="sm">
            <Helmet title="Daniel Reguero Blog" />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    py: 8,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: "2.2rem", sm: "3rem" } }}
                >
                    Daniel Reguero
                </Typography>

                <Typography sx={{ fontSize: "1.2rem", color: colors.text, mb: 0.5 }}>
                    <Box component="span" sx={{ color: colors.accent, mr: 1 }}>&gt;</Box>
                    I just wanna make stuff
                </Typography>

                <Typography sx={{ color: colors.muted, fontStyle: "italic", mb: 4 }}>
                    Isaiah 40:31
                </Typography>

                <Stack spacing={1.25}>
                    {routes.map((route, i) => (
                        <HomeLink route={route} key={i} />
                    ))}
                </Stack>
            </Box>
        </Container>
    );
};

export default Home;
