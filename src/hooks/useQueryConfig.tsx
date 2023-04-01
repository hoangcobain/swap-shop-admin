import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import useQueryParams from './useQueryParams';
import { QueryConfig } from 'src/types/util.type';

export default function useQueryConfig() {
    const queryParams: QueryConfig = useQueryParams();
    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || '1',
            limit: queryParams.limit || '20',
            sort_by: queryParams.sort_by,
            title: queryParams.title,
            order_by: queryParams.order_by,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            categories: queryParams.categories,
        },
        isUndefined,
    );
    return queryConfig;
}
