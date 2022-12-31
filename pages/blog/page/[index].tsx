import { GetStaticProps, GetStaticPropsContext } from 'next';

import BlogHome from '../index';

import {
    AVAILABLE_PAGES,
    paginatePosts
} from '../../../lib/BlogHandler';
import { CONSTANTS } from '../../../lib/constants';
import { StaticUrlGenerator } from '../../../lib/utils';

export const getStaticPaths = async () => {

    const allowedPathBase = (value: string) => ({ params: { index: value }});

    const allowedPageNumbers = [...Array(AVAILABLE_PAGES)].map((_, index) => allowedPathBase(String(index + 1)));
    allowedPageNumbers.shift();

    return {
        paths: [ ...allowedPageNumbers ],
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<BlogProps> = async ( context: GetStaticPropsContext ) => {
    const index = context.params?.index || 1;
    const currentPosts = paginatePosts(+index);
    return {
        props: {
            header: {
                show: true,
                detectBackNavigation: true,
                variant: 'default'
            },
            seo: {
                title: `Page ${index}`,
                description: CONSTANTS.BLOG.DESCRIPTION,
                baseName: CONSTANTS.BLOG.NAME,
                url: StaticUrlGenerator(__filename, { index }),
                keywords: CONSTANTS.BLOG.KEYWORDS
            },
            currentPage: +index,
            availablePagesAmount: currentPosts.pages,
            entries: currentPosts.page,
            availableTags: currentPosts.availableTags,
            availableCategories: currentPosts.availableCategories
        }
    };
};

export default BlogHome;
