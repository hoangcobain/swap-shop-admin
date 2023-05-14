import {
    Box,
    Card,
    CardHeader,
    Checkbox,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
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
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { User } from 'src/types/user.type';
import BulkActions from '../components/BulkActions';
import { omit } from 'lodash';
import { TypographyProps } from '@mui/material/Typography';
import {
    TableCellBaseProps,
    TableCellProps,
} from '@mui/material/TableCell/TableCell';
import { Label } from '@mui/icons-material';
import { STATUS_USER } from 'src/constants/user';
import UserModal from './UserModal';
import Popover from 'src/components/Popover';

interface RecentOrdersTableProps {
    className?: string;
    users: User[];
}

interface Filters {
    status: any;
}

const applyPagination = (
    users: User[],
    page: number,
    limit: number,
): User[] => {
    return users.slice(page * limit, page * limit + limit);
};

const applyFilters = (users: User[], filters: Filters): any[] => {
    return users.filter((user) => {
        let matches = true;

        if (
            filters.status &&
            user.status.toLowerCase() !== filters.status.toLowerCase()
        ) {
            matches = false;
        }

        return matches;
    });
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ users }) => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const selectedBulkActions = selectedUsers.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const selectedSomeUsers =
        selectedUsers.length > 0 && selectedUsers.length < users.length;
    const selectedAllCryptoOrders = selectedUsers.length === users.length;
    const [filters, setFilters] = useState<Filters>({
        status: null,
    });

    const filteredUsers = applyFilters(users, filters);
    const paginationUsers = applyPagination(filteredUsers, page, limit);
    const theme = useTheme();

    const options: Omit<TypographyProps, 'children'> = {
        variant: 'body1',
        gutterBottom: true,
        noWrap: true,
    };

    const optionsHeaderRow = {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#333',
    };

    const getStatusLabel = (UserStatus: any): JSX.Element => {
        const map = {
            active: {
                text: 'Active',
                color: 'success',
            },
            inactive: {
                text: 'Inactive',
                color: 'warning',
            },
            blocked: {
                text: 'Blocked',
                color: 'error',
            },
        };

        const { text, color }: any = map[UserStatus];

        return <Label color={color}>{text}</Label>;
    };

    const statusOptions = Object.keys(STATUS_USER).map((status) => ({
        id: status,
        name: status,
    }));

    const tableRows = [
        'Id',
        'Tên đăng nhập',
        'Email',
        'Địa chỉ',
        'Số điện thoại',
        'Họ và tên',
        'Quyền',
        'Trạng thái',
        'Ngày khởi tạo',
        'Ngày cập nhật',
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

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value));
    };

    const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedUsers(
            event.target.checked ? users.map((user) => user.id) : [],
        );
    };

    const handleSelectOneUsers = (userId: string) => () => {
        if (!selectedUsers.includes(userId)) {
            setSelectedUsers((prevSelected) => [...prevSelected, userId]);
        } else {
            setSelectedUsers((prevSelected) =>
                prevSelected.filter((id) => id !== userId),
            );
        }
    };

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
                            {tableRows.map((item) => (
                                <TableCell key={item} sx={optionsHeaderRow}>
                                    {item}
                                </TableCell>
                            ))}
                            <TableCell align="right" sx={optionsHeaderRow}>
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginationUsers.map((user) => {
                            return (
                                <TableRow hover key={user.id}>
                                    <TableCell>
                                        <Typography variant="body2" noWrap>
                                            {user.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography {...options}>
                                            {user.username}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography {...options}>
                                            {user.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" noWrap>
                                            {user.address}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" noWrap>
                                            {user.phoneNumber}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography {...options}>
                                            {user.fullName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography {...options}>
                                            {user.roles.reduce(
                                                (value, current) => {
                                                    value +=
                                                        current.role.name +
                                                        ', ';
                                                    return value;
                                                },
                                                '',
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {getStatusLabel(user.status)}
                                    </TableCell>
                                    <TableCell>
                                        <Typography {...options}>
                                            {format(
                                                parseInt(user.createdDate),
                                                'dd/MM/yyyy hh:mm',
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography {...options}>
                                            {format(
                                                parseInt(user.updatedDate),
                                                'dd/MM/yyyy hh:mm',
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Popover
                                            renderPopover={
                                                <UserModal user={user} />
                                            }
                                        >
                                            <Tooltip title="Edit User" arrow>
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
                    count={filteredUsers.length}
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
    users: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
    users: [],
};

export default RecentOrdersTable;
