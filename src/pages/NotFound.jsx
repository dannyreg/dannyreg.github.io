import { Box, Typography, Link } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

import { colors } from "../theme";
import Seo from "../components/Seo";

function NotFound() {
    return (
        <Box sx={{ textAlign: "center", py: 8 }}>
            <Seo
                title="Daniel Reguero Blog | Not Found"
                description="The page you're looking for doesn't exist."
                path="/404"
            />
            <Typography variant="h2" component="h1" sx={{ color: colors.accent, fontSize: "4rem", mb: 1 }}>
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
