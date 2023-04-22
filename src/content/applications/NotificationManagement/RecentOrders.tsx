import { Card } from '@mui/material';
import { usePublicNotificationsQuery } from 'src/hooks/useRequest';
import { Notification } from 'src/types/notification.type';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
    const { data: notifications } = usePublicNotificationsQuery();

    return (
        <Card>
            {notifications && (
                <RecentOrdersTable notifications={notifications} />
            )}
        </Card>
    );
}

export default RecentOrders;
