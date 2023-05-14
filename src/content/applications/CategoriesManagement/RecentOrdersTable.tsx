import {
    Box,
    Card,
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
import { TypographyProps } from '@mui/material/Typography';
import BulkActions from '../components/BulkActions';
import { Category } from 'src/types/category.type';
import Popover from 'src/components/Popover';
import CategoryModal from './CategoryModal';

interface RecentOrdersTableProps {
    className?: string;
    categories: Category[];
}

const applyPagination = (
    categories: Category[],
    page: number,
    limit: number,
): Category[] => {
    return categories.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ categories }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const paginationCategories = applyPagination(categories, page, limit);

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

    const tableRows = [
        'Id',
        'Tên thể loại',
        'Hình ảnh',
        'Ngày khởi tạo',
        'Ngày cập nhật',
    ];

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value));
    };

    return (
        <Card>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={optionsHeaderRow}>STT</TableCell>
                            {tableRows.map((item) => (
                                <TableCell key={item} sx={optionsHeaderRow}>
                                    {item}
                                </TableCell>
                            ))}
                            <TableCell align="left" sx={optionsHeaderRow}>
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginationCategories.map((category, index) => {
                            return (
                                <TableRow hover key={category.id}>
                                    <TableCell>
                                        <Typography variant="body2" noWrap>
                                            {index + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" noWrap>
                                            {category.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography {...options}>
                                            {category.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                            }}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Typography {...options}>
                                            {format(
                                                parseInt(category.createdDate),
                                                'dd/MM/yyyy hh:mm',
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography {...options}>
                                            {format(
                                                parseInt(category.updatedDate),
                                                'dd/MM/yyyy hh:mm',
                                            )}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Popover
                                            renderPopover={
                                                <CategoryModal
                                                    category={category}
                                                />
                                            }
                                        >
                                            <Tooltip title="Edit Order" arrow>
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
                    count={paginationCategories.length}
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
    categories: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
    categories: [],
};

export default RecentOrdersTable;
