import styles from './AppHeader.module.scss';

export const DEFAULT = {
    containerClassName: styles.container,
    dynamicItems: [
        { icon: 'bi bi-house-fill', label: 'Home', href: '/' }
    ],
    staticItems: [
        { icon: 'bi bi-house-fill', label: 'Home', href: '/', mobileOnly: true },
        { icon: 'bi bi-person-lines-fill', label: 'DevBlog', href: '/blog/' },
        { icon: 'bi bi-briefcase-fill', label: 'Portfolio', href: '/portfolio/' },
        { icon: 'bi bi-patch-check-fill', label: 'About me', href: '/about/' }
    ]
};

export const CENTERED = {
    containerClassName: styles.centeredContainer,
    dynamicItems: [
        { icon: 'bi bi-person-lines-fill', label: 'DevBlog', href: '/blog/' },
        { icon: 'bi bi-briefcase-fill', label: 'Portfolio', href: '/portfolio/' },
        { icon: 'bi bi-person-lines-fill', label: 'DevBlog', href: '/blog/', mobileOnly: true },
        { icon: 'bi bi-briefcase-fill', label: 'Portfolio', href: '/portfolio/', mobileOnly: true },
    ],
    staticItems: [
        { icon: 'bi bi-github', label: 'GitHub', href: 'https://github.com/k3llydev' },
        { icon: 'bi bi-patch-check-fill', label: 'About me', href: '/about/' },
        { icon: 'bi bi-github', label: 'GitHub', href: 'https://github.com/k3llydev', mobileOnly: true },
        { icon: 'bi bi-patch-check-fill', label: 'About me', href: '/about/', mobileOnly: true }
    ]
};
