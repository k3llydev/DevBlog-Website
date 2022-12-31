interface AppHeaderProps {
    detectBackNavigation: boolean;
    shareShortenedURL?: string;
    show: boolean;
    variant: 'default' | 'centered';
}

interface HeaderItem {
    icon: string;
    label: string;
    href: string;
    action?: Function;
    mobileOnly?: boolean;
}

interface HeaderTemplate {
    containerClassName: string;
    dynamicItems: HeaderItem[];
    staticItems: HeaderItem[];
}
