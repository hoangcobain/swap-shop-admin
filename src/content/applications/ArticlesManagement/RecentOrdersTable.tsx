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
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DOMPurify from 'dompurify';
import Label from 'src/components/Label';
import Popover from 'src/components/Popover';
import { Article } from 'src/types/article.type';
import BulkActions from '../components/BulkActions';
import ArticleModal from './ArticleModal';
import { STATUS_ARTICLE } from 'src/constants/article';

interface RecentOrdersTableProps {
    className?: string;
    articles: Article[];
}

interface Filters {
    status: any;
}

const getStatusLabel = (ArticleStatus: any): JSX.Element => {
    const map = {
        rejected: {
            text: 'Rejected',
            color: 'error',
        },
        approved: {
            text: 'Approved',
            color: 'success',
        },
        blocked: {
            text: 'Blocked',
            color: 'warning',
        },
        pending: {
            text: 'Pending',
            color: 'warning',
        },
    };

    const { text, color }: any = map[ArticleStatus];

    return <Label color={color}>{text}</Label>;
};

const applyFilters = (articles: Article[], filters: Filters): any[] => {
    return articles.filter((article) => {
        let matches = true;

        if (
            filters.status &&
            article.status.toLowerCase() !== filters.status.toLowerCase()
        ) {
            matches = false;
        }

        return matches;
    });
};

const applyPagination = (
    articles: Article[],
    page: number,
    limit: number,
): Article[] => {
    return articles.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ articles }) => {
    const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
    const selectedBulkActions = selectedArticles.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        status: null,
    });

    const statusOptions = Object.keys(STATUS_ARTICLE).map((status) => ({
        id: status,
        name: status,
    }));

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

    const handleSelectAllArticles = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        setSelectedArticles(
            event.target.checked ? articles.map((article) => article.id) : [],
        );
    };

    const handleSelectOneArticle = (
        event: ChangeEvent<HTMLInputElement>,
        articleId: string,
    ): void => {
        if (!selectedArticles.includes(articleId)) {
            setSelectedArticles((prevSelected) => [...prevSelected, articleId]);
        } else {
            setSelectedArticles((prevSelected) =>
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

    const filteredArticles = applyFilters(articles, filters);
    const paginatedArticles = applyPagination(filteredArticles, page, limit);
    console.log(filters, filteredArticles, paginatedArticles);

    const selectedSomeArticles =
        selectedArticles.length > 0 &&
        selectedArticles.length < articles.length;
    const selectedAllArticles = selectedArticles.length === articles.length;
    const theme = useTheme();

    console.log(paginatedArticles);

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
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedArticles.map((article) => {
                            const isArticleSelected = selectedArticles.includes(
                                article.id,
                            );
                            return (
                                <TableRow hover key={article.id}>
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
                                        <div
                                            style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '11rem',
                                            }}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(
                                                        article.description,
                                                    ),
                                                }}
                                                style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: '3',
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            />
                                        </div>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {article.user.fullName}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        {article.price ? article.price : 'Free'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {getStatusLabel(article.status)}
                                    </TableCell>

                                    <TableCell align="center">
                                        <div style={{ display: 'flex' }}>
                                            <Popover
                                                renderPopover={
                                                    <ArticleModal
                                                        article={article}
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
                                            <Tooltip title="Delete Order" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            background:
                                                                theme.colors
                                                                    .error
                                                                    .lighter,
                                                        },
                                                        color: theme.palette
                                                            .error.main,
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                >
                                                    <DeleteTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
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
                    count={filteredArticles.length}
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
