import { GetStaticProps, GetStaticPropsContext } from 'next';
import BlogHome from '../index';

import {
    AVAILABLE_TAGS,
    getPostsByLabel
} from '../../../lib/BlogHandler';
import { CONSTANTS } from '../../../lib/constants';
import { StaticUrlGenerator } from '../../../lib/utils';

export const getStaticPaths = async () => {

    const allowedPathBase = (value: string) => ({ params: { label: value }});
    const allowedPageTags = AVAILABLE_TAGS.map((tag) => allowedPathBase(tag.abbreviated.toLowerCase()));

    return {
        paths: [ ...allowedPageTags ],
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<Page.StaticGenericProps> = async ( context: GetStaticPropsContext ) => {

    const label = context.params?.label || '';
    const currentPage = 1;
    const currentPosts = getPostsByLabel(currentPage, label.toString());
    const currentSearchLabel = currentPosts.page[0].tags.find(t => t.abbreviated === label);

    return {
        props: {
            header: {
                show: true,
                detectBackNavigation: true,
                variant: 'default'
            },
            seo: {
                title: `Results for ${currentSearchLabel?.label}`,
                description: CONSTANTS.BLOG.DESCRIPTION,
                baseName: CONSTANTS.BLOG.NAME,
                url: StaticUrlGenerator(__filename, { label }),
                keywords: CONSTANTS.BLOG.KEYWORDS
            },
            currentPage: currentPage,
            currentLabel: label.toString(),
            availablePagesAmount: currentPosts.pages,
            entries: currentPosts.page,
            availableTags: currentPosts.availableTags,
            availableCategories: currentPosts.availableCategories
        }
    };
};

export default BlogHome;
