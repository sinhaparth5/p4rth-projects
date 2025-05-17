export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    website: 'https://projects.parthsinha.com',
    title: 'Projects | Parth Sinha',
    subtitle: 'Projects by Parth Sinha',
    description: 'Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/parth-sinha18/'
        },
        {
            text: 'Instagram',
            href: 'https://instagram.com/sinhparth5'
        },
        {
            text: 'X/Twitter',
            href: 'https://x.com/sinhaparth555'
        },
        {
            text: 'Medium',
            href: 'https://parth-sinha.medium.com/'
        }
    ],
    hero: {
        title: 'Hi There & Welcome to My Corner of the Web!',
        text: "I'm **Parth Sinha**, a driven student and freelance AI/ML and software developer with a passion for creating intelligent, user-focused solutions. I thrive at the intersection of code, creativity, and cutting-edge technology, blending curiosity, targeted research, and a strong sense of aesthetics to build impactful projects. My work is fueled by a love for innovative software, clean design, and the power of machine learning to solve real-world problems. Explore my coding journey and projects on <a href='https://github.com/sinhaparth5'>GitHub</a>, or connect with me on <a href='https://twitter.com/sinhaparth555'>Twitter/X</a> to share ideas and insights!",
        image: {
            src: '/hero.jpeg',
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
