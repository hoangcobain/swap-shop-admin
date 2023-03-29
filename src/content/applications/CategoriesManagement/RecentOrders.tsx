import { Card } from '@mui/material';
import { useCategoriesQuery } from 'src/hooks/useRequest';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
    const { data: categories } = useCategoriesQuery();

    return (
        <Card>
            {categories && <RecentOrdersTable categories={categories} />}
        </Card>
    );
}

export default RecentOrders;
