export const BuildQueryParams = (origin: string, page: number, category: string, labels: string) => {
    const params = new URLSearchParams('');

    if(page > 1) params.set('page', page.toString());

    if(category.toString() !== '-1') params.set('category', category);

    if(labels.length > 0) params.set('labels', labels);

    const newQueryParams = params.toString();

    return newQueryParams.length > 0 ? '?' + newQueryParams : '';
};
