import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';

import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { Category } from 'src/types/category.type';

import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
    useInsertCategoryMutation,
    useUpdateCategoryMutation,
} from 'src/hooks/useRequest';

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
    const { handleSubmit, register, setValue } = useForm<FormState>({
        defaultValues: {
            name: '',
            image: '',
        },
    });

    const queryClient = useQueryClient();
    const insertCategoryMutation = useInsertCategoryMutation();
    const updateCategoryMutation = useUpdateCategoryMutation();

    useEffect(() => {
        if (category) {
            setValue('name', category.name);
            setValue('image', category.image);
        }
    }, [category]);

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
                            toast.success('Thêm loại thành công!', {
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
            updateCategoryMutation.mutate(
                {
                    updateCategoryInput: {
                        id: category.id,
                        name: data.name,
                        image: data.image,
                    },
                },
                {
                    onSuccess: (data) => {
                        if (data.success === true) {
                            toast.success('Cập nhật loại thành công!', {
                                toastId: 'updatedCategory',
                            });
                            queryClient.invalidateQueries({
                                queryKey: ['categories'],
                            });
                        }
                    },
                },
            );
        }
    };

    return (
        <Box sx={style} ref={ref} tabIndex={-1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Điều chỉnh loại sản phẩm:
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
                    label="Tên loại"
                    type="text"
                    autoComplete="current-password"
                    variant="standard"
                    fullWidth
                    {...register('name')}
                />
                <TextField
                    id="standard-password-input"
                    label="Hình ảnh"
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
                    {insertCategoryMutation.isLoading ||
                    updateCategoryMutation.isLoading ? (
                        <LoadingButton>
                            {category ? 'Đang cập nhật...' : 'Đang tạo...'}
                        </LoadingButton>
                    ) : (
                        <Button
                            size="large"
                            variant="contained"
                            type="submit"
                            fullWidth
                        >
                            {category ? 'Cập nhật' : 'Tạo'}
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
});

export default CategoryModal;
