declare namespace AppHeadProps {
    interface Generic {
        seo: SEO.Generic
    }
    interface Article {
        seo: SEO.Article
    }
}

interface SimpleCategory {
    label: string;
}

declare namespace SEO {

    interface Base {
        title: string;
        description: string;
        baseName: string;
        url: string;
        keywords: TagDetail[];
    }

    interface Generic extends Base {
        keywords: string[];
    }

    interface Article extends Base {
        author: string;
        published_date: string;
        last_modified: string;
        category: CategoryDetail | SimpleCategory;
        keywords: string[];
    }

}
