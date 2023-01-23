import Link from 'next/link';

import styles from './DynamicPagination.module.scss';

const VISIBLE_PAGES = 5;

const DynamicPagination = ({ mainPage, baseLink, pages, currentPage }: PaginationProps) => {

    const firstBlockPage = Math.floor( (currentPage - 1) / VISIBLE_PAGES );
    const availablePages = [...Array(pages)].map((_, index) => index + 1).splice(firstBlockPage * VISIBLE_PAGES, VISIBLE_PAGES);
    const getPageLink = (page: number) => page === 1 ? mainPage : baseLink + page.toString();
    const getItemClassName = (page: number) =>
        currentPage === page
            ? [styles.active, styles.item].join(' ')
            : styles.item;

    const previousPageClassName = [
        ...(currentPage - 1 < 1 ? [styles.disabled] : []),
        styles.item,
        styles.active
    ].join(' ');

    const nextPageClassName = [
        ...(currentPage + 1 > pages ? [styles.disabled] : []),
        styles.item,
        styles.active
    ].join(' ');

    return(
        <div className={styles.container}>
            <Link href={getPageLink(currentPage - 1)} className={previousPageClassName}>
                <i className="bi bi-chevron-compact-left"></i>
            </Link>
            { availablePages.map(page => (
                <Link href={getPageLink(page)} key={`page-${page}`} className={getItemClassName(page)}>
                    <span>{page}</span>
                </Link>
            )) }
            <Link href={getPageLink(currentPage + 1)} className={nextPageClassName}>
                <i className="bi bi-chevron-compact-right"></i>
            </Link>
        </div>
    );
};

export default DynamicPagination;
