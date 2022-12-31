import Head from 'next/head';
import { Native, OpenGraph, Google } from '../../../../lib/seo';

const ArticleHead = ({
    seo: { title, baseName, description, url, author, keywords, category, published_date, last_modified }
}: AppHeadProps.Article): JSX.Element => {
    return(
        <Head>

            {/* SEO */}
            { Native.title(`${title} | ${baseName}`) }
            { Native.description(`${description}`) }
            { OpenGraph.title(`${title} | ${baseName}`) }
            { OpenGraph.description(`${description}`) }
            { OpenGraph.type('article') }
            { OpenGraph.image() }
            { OpenGraph.imageWidth() }
            { OpenGraph.imageHeight() }
            { OpenGraph.url(url) }
            { OpenGraph.article.author(`${author}`) }
            { OpenGraph.article.published_time(published_date) }
            { OpenGraph.article.modified_time(last_modified) }
            { OpenGraph.article.section(category.label) }
            { OpenGraph.article.tag(keywords.join(',')) }
            { Google.disableTranslation }

        </Head>
    );
};

export default ArticleHead;
