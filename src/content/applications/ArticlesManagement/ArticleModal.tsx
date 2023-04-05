import { Autocomplete, Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';

import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useCategoriesQuery } from 'src/hooks/useRequest';
import { Article } from 'src/types/article.type';

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

type FormState = Omit<Article, 'id'>;

interface Props {
    article: Article;
}

const ArticleModal = forwardRef((props: Props, ref) => {
    const { article } = props;
    const { handleSubmit, register } = useForm<FormState>({
        defaultValues: {
            name: article.name,
            categories: [],
            price: article.price ? article.price : 0,
            description: article.description,
            images: [],
            thumbnail: '',
            title: article.title,
            status: article.status,
        },
    });

    const queryClient = useQueryClient();
    const { data: categoriesData } = useCategoriesQuery();

    const handleSubmitCategory = (data: FormState) => {
        console.log(data);
    };

    const categories = categoriesData?.map((category) => category.name);
    const isLoading = false;

    return (
        <Box sx={style} ref={ref} tabIndex={-1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit article
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
                    label="Title"
                    type="text"
                    variant="standard"
                    fullWidth
                    {...register('title')}
                />
                <TextField
                    label="Description"
                    type="text"
                    variant="standard"
                    fullWidth
                    {...register('description')}
                />
                <TextField
                    label="Price"
                    type="text"
                    variant="standard"
                    fullWidth
                    {...register('price')}
                />
                <TextField
                    label="Status"
                    type="text"
                    variant="standard"
                    fullWidth
                    {...register('status')}
                />
                <Autocomplete
                    disablePortal
                    options={categories ? categories : ['No categories']}
                    defaultValue={article.categories.reduce(
                        (value, current) => {
                            value += current.name + ', ';
                            return value;
                        },
                        '',
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Category"
                            variant="standard"
                            fullWidth
                        />
                    )}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '12px',
                        width: '40ch',
                    }}
                >
                    {isLoading ? (
                        <LoadingButton>Updating</LoadingButton>
                    ) : (
                        <Button
                            size="large"
                            variant="contained"
                            type="submit"
                            fullWidth
                        >
                            Update
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
});

export default ArticleModal;
