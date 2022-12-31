import Head from 'next/head';
import { Native, OpenGraph, Google } from '../../../../lib/seo';

const GenericHead = ({
    seo: { title, baseName, description, url }
}: AppHeadProps.Generic): JSX.Element => {
    return(
        <Head>

            {/* SEO */}
            { Native.title(`${title} | ${baseName}`) }
            { Native.description(`${description}`) }
            { OpenGraph.title(`${title} | ${baseName}`) }
            { OpenGraph.description(`${description}`) }
            { OpenGraph.image() }
            { OpenGraph.imageWidth() }
            { OpenGraph.imageHeight() }
            { OpenGraph.type('website') }
            { OpenGraph.url(url) }
            { Google.disableTranslation }

        </Head>
    );
};

export default GenericHead;
