import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    CardHeader,
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from '../components/BulkActions';
import { Article } from 'src/types/article.type';

interface RecentOrdersTableProps {
    className?: string;
    articles: Article[];
}

interface Filters {
    status?: any;
}

const getStatusLabel = (cryptoOrderStatus: any): JSX.Element => {
    const map = {
        failed: {
            text: 'Failed',
            color: 'error',
        },
        completed: {
            text: 'Completed',
            color: 'success',
        },
        pending: {
            text: 'Pending',
            color: 'warning',
        },
    };

    const { text, color }: any = map[cryptoOrderStatus];

    return <Label color={color}>{text}</Label>;
};

const applyPagination = (
    articles: Article[],
    page: number,
    limit: number,
): Article[] => {
    return articles.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ articles }) => {
    const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
        [],
    );
    const selectedBulkActions = selectedCryptoOrders.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        status: null,
    });

    const statusOptions = [
        {
            id: 'all',
            name: 'All',
        },
        {
            id: 'completed',
            name: 'Completed',
        },
        {
            id: 'pending',
            name: 'Pending',
        },
        {
            id: 'failed',
            name: 'Failed',
        },
    ];

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string | null = null;

        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            status: value,
        }));
    };

    const handleSelectAllCryptoOrders = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        setSelectedCryptoOrders(
            event.target.checked
                ? articles.map((cryptoOrder) => cryptoOrder.id)
                : [],
        );
    };

    const handleSelectOneCryptoOrder = (
        event: ChangeEvent<HTMLInputElement>,
        cryptoOrderId: string,
    ): void => {
        if (!selectedCryptoOrders.includes(cryptoOrderId)) {
            setSelectedCryptoOrders((prevSelected) => [
                ...prevSelected,
                cryptoOrderId,
            ]);
        } else {
            setSelectedCryptoOrders((prevSelected) =>
                prevSelected.filter((id) => id !== cryptoOrderId),
            );
        }
    };

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const paginatedCryptoOrders = applyPagination(articles, page, limit);
    const selectedSomeCryptoOrders =
        selectedCryptoOrders.length > 0 &&
        selectedCryptoOrders.length < articles.length;
    const selectedAllCryptoOrders =
        selectedCryptoOrders.length === articles.length;
    const theme = useTheme();

    return (
        <Card>
            {selectedBulkActions && (
                <Box flex={1} p={2}>
                    <BulkActions />
                </Box>
            )}
            {!selectedBulkActions && (
                <CardHeader
                    action={
                        <Box width={150}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.status || 'all'}
                                    onChange={handleStatusChange}
                                    label="Status"
                                    autoWidth
                                >
                                    {statusOptions.map((statusOption) => (
                                        <MenuItem
                                            key={statusOption.id}
                                            value={statusOption.id}
                                        >
                                            {statusOption.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    }
                    title="Recent Orders"
                />
            )}
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={selectedAllCryptoOrders}
                                    indeterminate={selectedSomeCryptoOrders}
                                    onChange={handleSelectAllCryptoOrders}
                                />
                            </TableCell>
                            <TableCell>Order Details</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCryptoOrders.map((article) => {
                            const isCryptoOrderSelected =
                                selectedCryptoOrders.includes(article.id);
                            return (
                                <TableRow
                                    hover
                                    key={article.id}
                                    selected={isCryptoOrderSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isCryptoOrderSelected}
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                handleSelectOneCryptoOrder(
                                                    event,
                                                    article.id,
                                                )
                                            }
                                            value={isCryptoOrderSelected}
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
                                            {article.id}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {article.createdDate}
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
                                            {article.title}
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
                                            {article.description}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {article.user.fullName}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Tooltip title="Edit Order" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background:
                                                            theme.colors.primary
                                                                .lighter,
                                                    },
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <EditTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Order" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background:
                                                            theme.colors.error
                                                                .lighter,
                                                    },
                                                    color: theme.palette.error
                                                        .main,
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <DeleteTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
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
                    count={paginatedCryptoOrders.length}
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
    articles: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
    articles: [],
};

export default RecentOrdersTable;
