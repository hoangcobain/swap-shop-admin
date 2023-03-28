import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { forwardRef } from 'react';

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

interface Props {
    handleSubmit: any;
    handleInsertCategory: any;
    register: any;
}

const CategoryModal = forwardRef((props: Props, ref) => {
    const { handleSubmit, handleInsertCategory, register } = props;
    return (
        <Box sx={style} ref={ref} tabIndex={-1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Create category
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
                onSubmit={handleSubmit(handleInsertCategory)}
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
                        Create
                    </Button>
                </Box>
            </Box>
        </Box>
    );
});

export default CategoryModal;
