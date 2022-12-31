import { GetStaticProps, GetStaticPropsContext } from 'next';
import BlogHome from '../../../index';
import {
    AVAILABLE_TAGS,
    getPostsByLabel
} from '../../../../../lib/BlogHandler';
import { CONSTANTS } from '../../../../../lib/constants';
import { StaticUrlGenerator } from '../../../../../lib/utils';

export const getStaticPaths = async () => {

    const allowedPaths = [];
    const allowedPathBase = (label: string, index: string) => ({ params: { label, index }});
    for(let i = 0; i < AVAILABLE_TAGS.length; i++) {
        const labelId = AVAILABLE_TAGS[i].abbreviated;
        const currentPosts = getPostsByLabel(1, labelId);
        for(let j = 0; j < currentPosts.pages; j++) {
            const pageNumber = j + 1;
            allowedPaths.push(allowedPathBase(labelId, pageNumber.toString()));
        }
    }

    return {
        paths: allowedPaths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<Page.StaticGenericProps> = async ( context: GetStaticPropsContext ) => {

    const label = context.params?.label || '';
    const index = context.params?.index || 0;

    const currentPage = +index;
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
                title: `Page ${currentPage} of ${currentSearchLabel?.label}`,
                description: CONSTANTS.BLOG.DESCRIPTION,
                baseName: CONSTANTS.BLOG.NAME,
                url: StaticUrlGenerator(__filename, { index, label }),
                keywords: CONSTANTS.BLOG.KEYWORDS
            },
            currentPage,
            currentLabel: label,
            availablePagesAmount: currentPosts.pages,
            entries: currentPosts.page,
            availableTags: currentPosts.availableTags,
            availableCategories: currentPosts.availableCategories
        }
    };
};

export default BlogHome;
