import { Box, Typography, Link } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { colors } from "../theme";

function NotFound() {
    return (
        <Box sx={{ textAlign: "center", py: 8 }}>
            <Helmet title="Daniel Reguero Blog | Not Found" />
            <Typography variant="h2" sx={{ color: colors.accent, fontSize: "4rem", mb: 1 }}>
                404
            </Typography>
            <Typography sx={{ color: colors.muted, mb: 4 }}>
                this page wandered off
            </Typography>
            <Link component={LinkRouter} to="/" color="secondary" underline="always">
                &larr; back home
            </Link>
        </Box>
    );
}

export default NotFound;
