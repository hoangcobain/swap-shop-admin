import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { STATUS_ARTICLE, STATUS_ARTICLE_INPUT } from 'src/constants/article';
import {
    useCategoriesQuery,
    usePushPrivateNotificationMutation,
    useUpdateStatusArticleMutation,
} from 'src/hooks/useRequest';
import { Article } from 'src/types/article.type';
import { FreeMode, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    width: 1000,
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
            name: '',
            categories: [],
            price: 0,
            description: '',
            images: [],
            thumbnail: '',
            title: '',
            status: article.status,
        },
    });

    const queryClient = useQueryClient();
    const { data: categoriesData } = useCategoriesQuery();
    const updateStatusArticle = useUpdateStatusArticleMutation();
    const pushPrivateNotification = usePushPrivateNotificationMutation();

    const handleSubmitArticle = (data: FormState) => {
        console.log(data);
        updateStatusArticle.mutate(
            {
                status: data.status,
                articleId: article.id,
            },
            {
                onSuccess: (data) => {
                    if (data.success === true) {
                        toast.success(data.message, {
                            toastId: 'updatedStatus',
                        });
                        queryClient.invalidateQueries({
                            queryKey: ['articles'],
                        });
                    }
                },
            },
        );
        if (data.status === STATUS_ARTICLE.APPROVED) {
            pushPrivateNotification.mutate({
                content: `${article.title} đã được duyệt`,
                recipientId: article.user.id,
            });
        } else if (data.status === STATUS_ARTICLE.REJECTED) {
            pushPrivateNotification.mutate({
                content: `${article.title} đã bị từ chối`,
                recipientId: article.user.id,
            });
        } else {
            pushPrivateNotification.mutate({
                content: `${article.title} đã bị khóa vì vi phạm chính sách của chúng tôi`,
                recipientId: article.user.id,
            });
        }
    };

    const categories = categoriesData?.map((category) => category.name);
    const isLoading = false;

    return (
        <Box sx={style} ref={ref} tabIndex={-1}>
            <Box>
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
                    onSubmit={handleSubmit(handleSubmitArticle)}
                >
                    <TextField
                        label="Title"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        {...register('title')}
                    />
                    <TextField
                        label="Description"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        {...register('description')}
                    />
                    <TextField
                        label="Price"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        {...register('price')}
                    />
                    <Autocomplete
                        disablePortal
                        options={STATUS_ARTICLE_INPUT}
                        defaultValue={
                            article.status === STATUS_ARTICLE_INPUT[1].label
                                ? STATUS_ARTICLE_INPUT[1]
                                : article.status ===
                                  STATUS_ARTICLE_INPUT[3].label
                                ? STATUS_ARTICLE_INPUT[3]
                                : STATUS_ARTICLE_INPUT[2]
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Status"
                                variant="standard"
                                fullWidth
                                {...register('status')}
                            />
                        )}
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
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Image
            </Typography> */}
            <>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                    width={500}
                    height={1000}
                    style={{ marginLeft: '10px' }}
                >
                    {article.images.map((image) => (
                        <SwiperSlide key={image}>
                            <img
                                style={{ width: '100%', height: '80%' }}
                                src={image}
                                loading="lazy"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        </Box>
    );
});

export default ArticleModal;
