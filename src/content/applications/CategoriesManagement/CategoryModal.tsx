import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { Category } from 'src/types/category.type';

import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useInsertCategoryMutation } from 'src/hooks/useRequest';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export interface FormState {
    name: string;
    image: string;
}

interface Props {
    category?: Category;
}

const CategoryModal = forwardRef((props: Props, ref) => {
    const { category } = props;
    const { handleSubmit, register } = useForm<FormState>({
        defaultValues: {
            name: category ? category.name : '',
            image: category ? category.image : '',
        },
    });

    const queryClient = useQueryClient();
    const insertCategoryMutation = useInsertCategoryMutation();
    const handleSubmitCategory = (data: FormState) => {
        if (!category) {
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
                        }
                    },
                },
            );
        } else {
            console.log('update');
        }
    };

    return (
        <Box sx={style} ref={ref} tabIndex={-1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit category
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                    marginBottom: 4,
                }}
                noValidate
                autoComplete="off"
                display="flex"
                flexDirection="column"
                alignItems="center"
                onSubmit={handleSubmit(handleSubmitCategory)}
            >
                <TextField
                    id="standard-password-input"
                    label="Category name"
                    type="text"
                    autoComplete="current-password"
                    variant="standard"
                    fullWidth
                    {...register('name')}
                />
                <TextField
                    id="standard-password-input"
                    label="Image"
                    type="text"
                    autoComplete="current-password"
                    variant="standard"
                    fullWidth
                    {...register('image')}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '12px',
                        width: '40ch',
                    }}
                >
                    <Button
                        size="large"
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        {category ? 'Update' : 'Create'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
});

export default CategoryModal;
