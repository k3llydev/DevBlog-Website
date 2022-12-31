import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SpinningWorld from '../../shared/spinning_world';
import * as TEMPLATES from './templates';

import styles from './AppHeader.module.scss';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hooks';
import { hideHeader, showHeader } from '../../../lib/redux/actions/headerComponentActions';

const BACK_NAVIGATION_ICON = 'bi bi-arrow-left';
const SHARE_ICON = 'bi bi-share-fill';

const AppHeader = ({ detectBackNavigation, shareShortenedURL, show, variant = 'default' }: AppHeaderProps) => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const isHeaderShown = useAppSelector((state:any) => state.appHeader.show);
    const shouldShowHeader = isHeaderShown || show;

    useEffect(() => {
        if(isHeaderShown && !show) dispatch(hideHeader());
        if(!isHeaderShown && show) dispatch(showHeader());
    }, []);

    const hasBackNavigation = true; // TODO: Implement router detection to see if user browser can navigate back

    // Handles back button navigation
    const GoBack = (e: any) => { // TODO: Fix event types
        e.preventDefault();
        router.back();
    };

    // Handles Share event to present shortened URL
    const ShareMe = (e: any) => { // TODO: Fix event types
        e.preventDefault();
        // TODO: Implement connection from a modal to the shortener API
        // USE: shareShortenedURL
    };

    // Select template
    let template: HeaderTemplate;
    switch(variant) {
        case 'default':
            template = TEMPLATES.DEFAULT
            break;
        case 'centered':
            template = TEMPLATES.CENTERED
            break;
        default:
            template = TEMPLATES.DEFAULT
    }

    useEffect(() => {
        if(!template) return;

        const isShareInserted = template.dynamicItems.findIndex((i) => i.icon === SHARE_ICON) >= 0;
        const isBackInserted = template.dynamicItems.findIndex((i) => i.icon.includes(BACK_NAVIGATION_ICON)) >= 0;

        // TODO: Implement URL shortening from backend API
        if(!isShareInserted && shareShortenedURL) {
            template.dynamicItems.push({ icon: SHARE_ICON, label: 'Share', href: router.asPath, action: ShareMe });
        }

        if(!isBackInserted && detectBackNavigation && hasBackNavigation) {
            template.dynamicItems.unshift({ icon: BACK_NAVIGATION_ICON, label: 'Go back', href: router.asPath, action: GoBack });
            template.dynamicItems.unshift({ icon: BACK_NAVIGATION_ICON, label: 'Go back', href: router.asPath, action: GoBack, mobileOnly: true });
        }

    });

    const containerClassSelector = (isHidden: boolean, mainClass: string) => {
        const classessToAdd = [];
        if(isHidden) classessToAdd.push(styles.containerHidden);
        classessToAdd.push(mainClass);
        return classessToAdd.join(' ');
    };

    const mobileOnlyClassSelector = (isMobileOnly?: boolean, ...classNames: string[]) => {
        const classessToAdd = [];
        if(isMobileOnly) classessToAdd.push(styles.mobileOnly);
        return [ ...classessToAdd, ...classNames ].join(' ');
    };

    const actionBinding = (action?: Function) => ({
        ...(action && { onClick: (e: any) => action(e) })
    });

    return(
        <header className={containerClassSelector(!shouldShowHeader, template.containerClassName)}>

            <div id="dynamicContainer" className={styles.dynamicContainer}>
                { template.dynamicItems.map((section, id) => (
                    <Link key={`dynamic-section-${id}`} href={section.href}>
                        <a className={mobileOnlyClassSelector(section.mobileOnly, styles.sectionItem)} {...actionBinding(section.action)}>
                            <i className={`${styles.sectionIcon} ${section.icon}`}></i>
                            <span className={styles.sectionLabel}>{section.label}</span>
                        </a>
                    </Link>
                )) }
            </div>
            <div id="centerContainer" className={styles.centerContainer}>
                <SpinningWorld className={styles.centerImage} width={styles.height} height={styles.height} color={styles.color} />
            </div>
            <div id="staticContainer" className={styles.staticContainer}>
                { template.staticItems.map((section, id) => (
                    <Link key={`static-section-${id}`} href={section.href}>
                        <a className={mobileOnlyClassSelector(section.mobileOnly, styles.sectionItem)} {...actionBinding(section.action)}>
                            <i className={`${styles.sectionIcon} ${section.icon}`}></i>
                            <span className={styles.sectionLabel}>{section.label}</span>
                        </a>
                    </Link>
                )) }
            </div>
        </header>
    );
};

export default AppHeader;
