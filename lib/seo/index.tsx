import { GoogleSchema } from './GoogleSchema';
import { OpenGraphSchema } from './OpenGraphSchema';

interface MetaTagProperties {
    property?: string;
    name?: string;
    content: string;
}

const MetaTag = (props: MetaTagProperties) => <meta {...props}></meta>;

const Native = {
    title: (value: string) => <title>{value}</title>,
    description: (content: string) => MetaTag({ name: 'description', content })
};

const OpenGraph = {
    title: (content: string) => MetaTag({ property: OpenGraphSchema.title, content }),
    description: (content: string) => MetaTag({ property: OpenGraphSchema.description, content }),
    type: (content: string) => MetaTag({ property: OpenGraphSchema.type, content }),
    image: (content: string = '/default.webp') => MetaTag({ property: OpenGraphSchema.image, content }),
    imageWidth: (content: string = '1200') => MetaTag({ property: OpenGraphSchema.imageWidth, content }),
    imageHeight: (content: string = '630') => MetaTag({ property: OpenGraphSchema.imageHeight, content }),
    url: (content: string) => MetaTag({ property: OpenGraphSchema.url, content }),
    article: {
        published_time: (content: string) => MetaTag({ property: OpenGraphSchema.article.published_time, content }),
        modified_time: (content: string) => MetaTag({ property: OpenGraphSchema.article.modified_time, content }),
        expiration_time: (content: string) => MetaTag({ property: OpenGraphSchema.article.expiration_time, content }),
        author: (content: string) => MetaTag({ property: OpenGraphSchema.article.author, content }),
        section: (content: string) => MetaTag({ property: OpenGraphSchema.article.section, content }),
        tag: (content: string) => MetaTag({ property: OpenGraphSchema.article.tag, content })
    }
};

const Google = {
    disableTranslation: MetaTag(GoogleSchema.DisableTransaltion),
    disableReadLoud: MetaTag(GoogleSchema.DisableReadLoud)
};

export { Native, OpenGraph, Google };
