import { Box, Typography, Link } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { colors } from "../theme";

function About() {
    return (
        <Box sx={{ maxWidth: 720, mx: "auto" }}>
            <Helmet title="Daniel Reguero Blog | About" />
            <Typography variant="h4" sx={{ mb: 4 }}>
                <Box component="span" sx={{ color: colors.accent, mr: 1 }}>#</Box>
                About
            </Typography>
            <Box sx={{ "& > p": { mb: 2.5, lineHeight: 1.8, color: colors.text } }}>
                <Typography component="p">
                    👋 Hey there, I'm Daniel, a software engineer primarily focused on web development.
                </Typography>
                <Typography component="p">
                    This blog is where I share my knowledge on topics I'm passionate about, as well as document my problem-solving journey.
                </Typography>
                <Typography component="p">
                    I specialize in Node.js, Java, Go, and AWS, with deep experience in auth systems, customer-facing APIs, and multi-tenant B2B SaaS. I also occasionally dabble in Unity and contribute to open-source projects when I have the chance.
                </Typography>
                <Typography component="p">
                    Follow me on <Link color="secondary" underline="always" href="https://github.com/HappyZombies" target="_blank" rel="noopener noreferrer">GitHub</Link> where I come up with my latest ideas and projects!
                </Typography>
            </Box>
        </Box>
    );
}

export default About;
