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
import { Report } from 'src/types/report.type';
import DOMPurify from 'dompurify';

interface RecentOrdersTableProps {
    className?: string;
    reports: Report[];
}

const applyPagination = (
    reports: Report[],
    page: number,
    limit: number,
): Report[] => {
    return reports.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ reports }) => {
    const [selectedReports, setSelectedReports] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const handleSelectAllNotifications = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        setSelectedReports(
            event.target.checked ? reports.map((report) => report.id) : [],
        );
    };

    const handleSelectOneArticle = (
        event: ChangeEvent<HTMLInputElement>,
        articleId: string,
    ): void => {
        if (!selectedReports.includes(articleId)) {
            setSelectedReports((prevSelected) => [...prevSelected, articleId]);
        } else {
            setSelectedReports((prevSelected) =>
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

    const paginatedReports = applyPagination(reports, page, limit);

    return (
        <Card>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nội dung</TableCell>
                            <TableCell>Mô tả</TableCell>
                            <TableCell>Người dùng</TableCell>
                            <TableCell>Bài đăng</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedReports.map((report) => {
                            const isNotificationSelected =
                                selectedReports.includes(report.id);
                            return (
                                <TableRow
                                    hover
                                    key={report.id}
                                    selected={isNotificationSelected}
                                >
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {report.id}
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
                                            {report.reason}
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
                                            {report.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '11rem',
                                            }}
                                        >
                                            {report.user.id}
                                        </div>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {report.user.fullName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '11rem',
                                            }}
                                        >
                                            {report.article.id}
                                        </div>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {report.article.title}
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
                                            {report.createdDate}
                                        </Typography>
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
                    count={reports.length}
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
    reports: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
    reports: [],
};

export default RecentOrdersTable;
