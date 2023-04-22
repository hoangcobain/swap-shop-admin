import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { STATUS_USER_INPUT } from 'src/constants/user';
import { useUpdateStatusUserMutation } from 'src/hooks/useRequest';
import { User } from 'src/types/user.type';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

type FormState = Omit<User, 'id'>;

interface Props {
    user: User;
}

const UserModal = forwardRef((props: Props, ref) => {
    const { user } = props;
    const { handleSubmit, register } = useForm<FormState>({
        defaultValues: {
            username: user.username,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber,
            fullName: user.fullName,
            status: user.status,
            roles: [],
        },
    });

    const queryClient = useQueryClient();

    const updateStatusUser = useUpdateStatusUserMutation();

    const handleSubmitUser = (data: FormState) => {
        console.log(data);
        updateStatusUser.mutate(
            {
                status: data.status,
                userId: user.id,
            },
            {
                onSuccess: (data) => {
                    if (data.success === true) {
                        toast.success(data.message, {
                            toastId: 'updatedUser',
                        });
                        queryClient.invalidateQueries({
                            queryKey: ['get-users'],
                        });
                    }
                },
            },
        );
    };

    const isLoading = false;

    return (
        <Box sx={style} ref={ref} tabIndex={-1}>
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit user
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
                    onSubmit={handleSubmit(handleSubmitUser)}
                >
                    <TextField
                        label="Username"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        {...register('username')}
                    />
                    <TextField
                        label="Email"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        {...register('email')}
                    />
                    <TextField
                        label="Address"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        {...register('address')}
                    />
                    <TextField
                        label="Phone"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        {...register('phoneNumber')}
                    />
                    <TextField
                        label="Fullname"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        {...register('fullName')}
                    />
                    <Autocomplete
                        disablePortal
                        options={STATUS_USER_INPUT}
                        defaultValue={
                            user.status === STATUS_USER_INPUT[0].label
                                ? STATUS_USER_INPUT[0]
                                : user.status === STATUS_USER_INPUT[1].label
                                ? STATUS_USER_INPUT[1]
                                : STATUS_USER_INPUT[2]
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
                    {/* <Autocomplete
                        disablePortal
                        options={role ? categories : ['No categories']}
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
                    /> */}
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
        </Box>
    );
});

export default UserModal;
