interface TagDetail {
    id: number;
    label: string;
    abbreviated: string;
}

interface CategoryDetail {
    id: number;
    label: string;
    abbreviated: string;
}

interface ComplexityDetail {
    id: number;
    label: string;
}

interface BlogEntry {
    title: string;
    description: string;
    author: string;
    date: string;
    illustration: string;
    tags: TagDetail[];
    hash: string;
    contentSource: string;
    last_modified: string;
    complexity: ComplexityDetail;
    category: CategoryDetail;
    storedAs: string;
}

interface BlogProps extends Page.StaticGenericProps {
    availablePagesAmount: number;
    currentPage: number;
    availableTags: TagDetail[];
    availableCategories: CategoryDetail[];
    entries: BlogEntry[];
    currentCategory?: string;
    currentLabel?: string;
}

interface PaginatedPostsProps {
    pages: number;
    page: BlogEntry[];
    availableTags: TagDetail[];
    availableCategories: CategoryDetail[];
}

interface PostProps extends Page.StaticArticleProps {
    post: BlogEntry;
    content: string;
}

interface BlogDetailProps {
    isPost: boolean;
    baseProps: BlogProps;
    postDetailProps: PostProps;
}
