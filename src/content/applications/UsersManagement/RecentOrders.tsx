import { Card } from '@mui/material';
import { useGetUsers } from 'src/hooks/useRequest';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
    const { data } = useGetUsers();

    return <Card>{data && <RecentOrdersTable users={data} />}</Card>;
}

export default RecentOrders;
