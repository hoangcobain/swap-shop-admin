import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCategoriesQuery } from 'src/hooks/useRequest';
import { Category } from 'src/types/category.type';
import CardMedia from '@mui/material/CardMedia';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from '../components/PageHeader';
import CategoryModal from './CategoryModal';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useInsertCategoryMutation } from 'src/hooks/useRequest';

function createData(props: Category) {
    return { ...props };
}

interface FormState {
    name: string;
    image: string;
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { handleSubmit, register } = useForm<FormState>({
        defaultValues: {
            name: '',
            image: '',
        },
    });
    const queryClient = useQueryClient();
    const insertCategoryMutation = useInsertCategoryMutation();

    const handleInsertCategory = (data: FormState) => {
        insertCategoryMutation.mutate(
            {
                name: data.name,
                image: data.image,
            },
            {
                onSuccess: (data) => {
                    if (data.success === true) {
                        toast.success(data.message, {
                            toastId: 'insertCategory',
                        });
                        queryClient.invalidateQueries({
                            queryKey: ['categories'],
                        });
                        handleClose();
                    }
                },
            },
        );
    };

    return (
        <>
            <PageTitleWrapper>
                <PageHeader
                    title="Categories Management"
                    buttonName="Create category"
                    renderModal={
                        <CategoryModal
                            handleInsertCategory={handleInsertCategory}
                            handleSubmit={handleSubmit}
                            register={register}
                        />
                    }
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
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
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CategoriesManagement;
