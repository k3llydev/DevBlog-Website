import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hooks';

import {
    openFilterView,
    closeFilterView,
    updateSelectedLabel,
    updateSelectedCategory,
    resetFilter,
    resetSelected
} from '../../../lib/redux/actions/filterComponentActions';

import styles from './FilterView.module.scss';

interface FilterViewProps {
    currentLabel?: string;
    currentCategory?: string;
    availableTags: TagDetail[];
    availableCategories: CategoryDetail[];
}

const FilterView = ({ availableTags, availableCategories, currentLabel, currentCategory }: FilterViewProps) => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const isSelectingFilters = useAppSelector((state:any) => state.filterArticles.isSelectingFilters);
    const selectedCategoryFilter = useAppSelector((state: any) => state.filterArticles.selectedCategory);
    const selectedLabelFilter = useAppSelector((state: any) => state.filterArticles.selectedLabel);

    const toggleFilterView = () => {
        if(isSelectingFilters) {
            dispatch(closeFilterView());
            dispatch(resetFilter());
        } else {
            dispatch(openFilterView());
            if(currentCategory) dispatch( updateSelectedCategory(currentCategory) );
            if(currentLabel) dispatch( updateSelectedLabel(currentLabel) );
        }
    };

    const updateSelectedFilter = (obj: string, value: string) => {
        dispatch( resetSelected() );
        if(obj === 'category') dispatch( updateSelectedCategory(value) );
        if(obj === 'label') dispatch( updateSelectedLabel(value) );
        if(obj === 'reset') dispatch( closeFilterView() ) && router.push('/blog/');
    };

    const navigateToFilter = () => {
        if(selectedCategoryFilter) router.push('/blog/category/' + selectedCategoryFilter);
        if(selectedLabelFilter) router.push('/blog/label/' + selectedLabelFilter);
        dispatch( closeFilterView() );
    }

    return(
        <div>
            <button onClick={toggleFilterView} className={styles.paginationButton}>Search or filter</button>
            <div className={`${styles.filterContainer} ${isSelectingFilters ? styles.open : ''}`}>
                <section className={styles.filterContent}>

                    <h3 className={styles.filteringTitle}>Categories</h3>
                    <div>
                        { availableCategories.map((category, index) => (
                            <div
                                onClick={() => updateSelectedFilter('category', category.abbreviated)}
                                key={`filter-category-${index + 1}`}
                                className={`${styles.tagButton} ${selectedCategoryFilter === category.abbreviated ? styles.selected : ''}`}>
                                <span>{category.label}</span>
                            </div>
                        )) }
                    </div>
                    <br/>
                    <h3 className={styles.filteringTitle}>Labels</h3>
                    <div>
                        { availableTags.map((tag, index) =>(
                            <div
                                onClick={() => updateSelectedFilter('label', tag.abbreviated)}
                                key={`filter-tag-${index + 1}`}
                                className={`${styles.tagButton} ${selectedLabelFilter === tag.abbreviated ? styles.selected : ''}`}>
                                <span>{tag.label}</span>
                            </div>
                        )) }
                    </div>
                    <br/>
                    <div>
                        <button className={styles.applyButton} onClick={() => navigateToFilter()}>Apply</button>
                        <button className={styles.resetButton} onClick={() => updateSelectedFilter('reset', '')}>Reset</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FilterView;
