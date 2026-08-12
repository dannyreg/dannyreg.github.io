import { Box, Typography, Link } from "@mui/material";

import { colors } from "../theme";
import { SITE_URL, SITE_NAME } from "../config";
import Seo from "../components/Seo";

const ABOUT_DESCRIPTION = "Daniel Reguero is a senior software engineer specializing in Node.js, Java, Go, and AWS, with deep experience in auth systems, customer-facing APIs, and multi-tenant B2B SaaS.";

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Senior Software Engineer",
    description: ABOUT_DESCRIPTION,
    sameAs: [
        "https://github.com/dannyreg",
        "https://www.linkedin.com/in/daniel-reguero/",
    ],
};

function About() {
    return (
        <Box sx={{ maxWidth: 720, mx: "auto" }}>
            <Seo
                title="Daniel Reguero Blog | About"
                description={ABOUT_DESCRIPTION}
                path="/about"
                jsonLd={personJsonLd}
            />
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                <Box component="span" sx={{ color: colors.accent, mr: 1 }}>#</Box>
                About
            </Typography>
            <Box sx={{ "& > p": { mb: 2.5, lineHeight: 1.8, color: colors.text } }}>
                <Typography component="p">
                    Hey there, I'm Daniel, a senior software engineer primarily focused on web development.
                </Typography>
                <Typography component="p">
                    This blog is where I share my knowledge on topics I'm passionate about, as well as document my problem-solving journey.
                </Typography>
                <Typography component="p">
                    I specialize in Node.js, Java, Go, and AWS, with deep experience in auth systems, customer-facing APIs, and multi-tenant B2B SaaS. I also occasionally dabble in Unity and contribute to open-source projects when I have the chance.
                </Typography>
                <Typography component="p">
                    Follow me on <Link color="secondary" underline="always" href="https://github.com/dannyreg" target="_blank" rel="noopener noreferrer">GitHub</Link> where I come up with my latest ideas and projects, or connect with me on <Link color="secondary" underline="always" href="https://www.linkedin.com/in/daniel-reguero/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>!
                </Typography>
            </Box>
        </Box>
    );
}

export default About;
