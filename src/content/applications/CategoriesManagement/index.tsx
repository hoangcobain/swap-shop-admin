import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useCategoriesQuery } from 'src/hooks/useRequest';
import { Category } from 'src/types/category.type';
import PageHeader from '../components/PageHeader';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import CategoryModal from '../CategoriesManagement/CategoryModal';
import Popover from 'src/components/Popover';

function createData(props: Category) {
    return { ...props };
}

function CategoriesManagement() {
    const { data: categories } = useCategoriesQuery();
    const rows = categories?.map((category) =>
        createData({
            id: category.id,
            name: category.name,
            image: category.image,
            createdDate: category.createdDate,
            updatedDate: category.updatedDate,
        }),
    );

    const theme = useTheme();

    return (
        <>
            <PageTitleWrapper>
                <PageHeader
                    title="Categories Management"
                    buttonName="Create category"
                    modal={<CategoryModal />}
                />
            </PageTitleWrapper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell>Category id</TableCell>
                            <TableCell>Category name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell align="right">Created date</TableCell>
                            <TableCell align="right">Updated date</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows &&
                            rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <CardMedia
                                            component="img"
                                            height="80"
                                            width="80"
                                            image={row.image}
                                            alt={row.name}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.createdDate}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.updatedDate}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Popover
                                            renderPopover={
                                                <CategoryModal category={row} />
                                            }
                                        >
                                            <Tooltip
                                                title="Edit Category"
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
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CategoriesManagement;
