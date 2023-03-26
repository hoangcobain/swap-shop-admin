import {
    Box,
    Card,
    Checkbox,
    Divider,
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

interface RecentOrdersTableProps {
    className?: string;
    users: User[];
}

const applyPagination = (
    users: User[],
    page: number,
    limit: number,
): User[] => {
    return users.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ users }) => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const selectedBulkActions = selectedUsers.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const paginationUsers = applyPagination(users, page, limit);
    const selectedSomeUsers =
        selectedUsers.length > 0 && selectedUsers.length < users.length;
    const selectedAllCryptoOrders = selectedUsers.length === users.length;

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

    const tableRows = Object.keys(
        omit(users[0], ['birthday', 'avatar', 'rating']),
    );

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

            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={selectedAllCryptoOrders}
                                    indeterminate={selectedSomeUsers}
                                    onChange={handleSelectAllUsers}
                                />
                            </TableCell>
                            {tableRows.map((item) => (
                                <TableCell key={item} sx={optionsHeaderRow}>
                                    {item}
                                </TableCell>
                            ))}
                            <TableCell align="right" sx={optionsHeaderRow}>
                                Status
                            </TableCell>
                            <TableCell align="right" sx={optionsHeaderRow}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginationUsers.map((user) => {
                            const isUsersSelected = selectedUsers.includes(
                                user.id,
                            );
                            return (
                                <TableRow
                                    hover
                                    key={user.id}
                                    selected={isUsersSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isUsersSelected}
                                            onChange={handleSelectOneUsers(
                                                user.id,
                                            )}
                                            value={isUsersSelected}
                                        />
                                    </TableCell>
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
                                        {user.rating}
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
                    count={paginationUsers.length}
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
