import { createTheme } from "@mui/material";

// Tomorrow Night inspired palette — keeps the original dark bg (#1d1f21)
// and React-cyan accent (#61dafb) the site was built around.
const colors = {
    bg: "#1d1f21",
    surface: "#25282c",
    border: "#33373b",
    text: "#c5c8c6",
    muted: "#8a8f93",
    accent: "#61dafb",
    accentDim: "#3a8fb0",
};

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: colors.bg,
            paper: colors.surface,
        },
        text: {
            primary: colors.text,
            secondary: colors.muted,
        },
        primary: {
            main: colors.text,
        },
        secondary: {
            main: colors.accent,
        },
        divider: colors.border,
    },
    typography: {
        fontFamily: "'Fira Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
        fontWeightLight: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: { fontWeight: 700, letterSpacing: "-0.02em" },
        h2: { fontWeight: 700, letterSpacing: "-0.02em" },
        h3: { fontWeight: 700, letterSpacing: "-0.02em" },
        h4: { fontWeight: 700, letterSpacing: "-0.01em" },
        h5: { fontWeight: 500 },
        h6: { fontWeight: 500 },
        body1: { lineHeight: 1.75 },
    },
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    scrollBehavior: "smooth",
                },
                body: {
                    backgroundColor: colors.bg,
                    color: colors.text,
                    WebkitFontSmoothing: "antialiased",
                },
                "::selection": {
                    background: "rgba(97, 218, 251, 0.25)",
                },
                "*::-webkit-scrollbar": {
                    width: "10px",
                    height: "10px",
                },
                "*::-webkit-scrollbar-track": {
                    background: colors.bg,
                },
                "*::-webkit-scrollbar-thumb": {
                    background: colors.border,
                    borderRadius: "5px",
                },
                "*::-webkit-scrollbar-thumb:hover": {
                    background: colors.muted,
                },
                "@keyframes blink": {
                    "0%, 49%": { opacity: 1 },
                    "50%, 100%": { opacity: 0 },
                },
                ".cursor": {
                    display: "inline-block",
                    width: "0.6em",
                    height: "1.05em",
                    marginLeft: "0.15em",
                    background: colors.accent,
                    verticalAlign: "text-bottom",
                    animation: "blink 1.1s step-end infinite",
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: "none",
            },
            styleOverrides: {
                root: {
                    color: colors.accent,
                    transition: "color 0.15s ease, opacity 0.15s ease",
                    "&:hover": {
                        opacity: 0.8,
                    },
                },
            },
        },
    },
});

export { colors };
export default theme;
