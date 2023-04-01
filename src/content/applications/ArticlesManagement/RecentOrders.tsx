import { Card } from '@mui/material';
import { useArticlesQuery } from 'src/hooks/useRequest';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
    const { data: articles } = useArticlesQuery();

    return (
        <Card>
            {articles && (
                <RecentOrdersTable articles={articles.data.articles} />
            )}
        </Card>
    );
}

export default RecentOrders;
