import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
    useChangeNotifyMutation,
    usePushNotificationMutation,
} from 'src/hooks/useRequest';
import { Notification } from 'src/types/notification.type';

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

type FormState = Omit<Notification, 'id'>;

interface Props {
    notification?: Notification;
}

const NotificationModal = forwardRef(({ notification }: Props, ref) => {
    const { handleSubmit, register, setValue } = useForm<FormState>({
        defaultValues: {
            content: '',
        },
    });
    const pushPublicNotification = usePushNotificationMutation();

    const changeNotification = useChangeNotifyMutation();

    useEffect(() => {
        if (notification) {
            setValue('content', notification.content);
        }
    }, [notification]);

    const handlePushPublicNotification = async (data: FormState) => {
        if (notification) {
            await changeNotification.mutateAsync({
                content: data.content,
                notificationId: notification.id,
            });
        } else {
            await pushPublicNotification.mutateAsync({
                content: data.content,
            });
        }

        toast.success('Thêm thông báo thành công!');
    };

    return (
        <Box sx={style} ref={ref} tabIndex={-1}>
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Điều chỉnh thông báo
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
                    onSubmit={handleSubmit(handlePushPublicNotification)}
                >
                    <TextField
                        label="Nội dung"
                        type="text"
                        variant="standard"
                        fullWidth
                        {...register('content')}
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
                            {notification ? ' Cập nhật' : 'Thêm'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

export default NotificationModal;
