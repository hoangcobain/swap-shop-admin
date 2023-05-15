import {
    Box,
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Popover from 'src/components/Popover';
import { Notification } from 'src/types/notification.type';
import NotificationModal from './NotificationModal';

interface RecentOrdersTableProps {
    className?: string;
    notifications: Notification[];
}

const applyPagination = (
    notifications: Notification[],
    page: number,
    limit: number,
): Notification[] => {
    return notifications.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ notifications }) => {
    const [selectedNotifications, setSelectedNotifications] = useState<
        string[]
    >([]);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const handleSelectAllNotifications = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        setSelectedNotifications(
            event.target.checked
                ? notifications.map((article) => article.id)
                : [],
        );
    };

    const handleSelectOneArticle = (
        event: ChangeEvent<HTMLInputElement>,
        articleId: string,
    ): void => {
        if (!selectedNotifications.includes(articleId)) {
            setSelectedNotifications((prevSelected) => [
                ...prevSelected,
                articleId,
            ]);
        } else {
            setSelectedNotifications((prevSelected) =>
                prevSelected.filter((id) => id !== articleId),
            );
        }
    };

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const paginatedNotifications = applyPagination(notifications, page, limit);

    const selectedSomeNotifications =
        selectedNotifications.length > 0 &&
        selectedNotifications.length < notifications.length;
    const selectedAllNotifications =
        selectedNotifications.length === notifications.length;
    const theme = useTheme();

    return (
        <Card>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={selectedAllNotifications}
                                    indeterminate={selectedSomeNotifications}
                                    onChange={handleSelectAllNotifications}
                                />
                            </TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Nội dung</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedNotifications.map((notification) => {
                            const isNotificationSelected =
                                selectedNotifications.includes(notification.id);
                            return (
                                <TableRow
                                    hover
                                    key={notification.id}
                                    selected={isNotificationSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isNotificationSelected}
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                handleSelectOneArticle(
                                                    event,
                                                    notification.id,
                                                )
                                            }
                                            value={isNotificationSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {notification.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {notification.content}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {notification.createdDate}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div>
                                            <Popover
                                                renderPopover={
                                                    <NotificationModal
                                                        notification={
                                                            notification
                                                        }
                                                    />
                                                }
                                            >
                                                <Tooltip
                                                    title="Edit Order"
                                                    arrow
                                                >
                                                    <IconButton
                                                        sx={{
                                                            '&:hover': {
                                                                background:
                                                                    theme.colors
                                                                        .primary
                                                                        .lighter,
                                                            },
                                                            color: theme.palette
                                                                .primary.main,
                                                        }}
                                                        color="inherit"
                                                        size="small"
                                                    >
                                                        <EditTwoToneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Popover>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={notifications.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>
        </Card>
    );
};

RecentOrdersTable.propTypes = {
    notifications: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
    notifications: [],
};

export default RecentOrdersTable;
