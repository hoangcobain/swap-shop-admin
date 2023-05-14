import { Card } from '@mui/material';
import {
    usePublicNotificationsQuery,
    useReportsQuery,
} from 'src/hooks/useRequest';
import { Notification } from 'src/types/notification.type';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
    const { data: reports } = useReportsQuery();

    return <Card>{reports && <RecentOrdersTable reports={reports} />}</Card>;
}

export default RecentOrders;
