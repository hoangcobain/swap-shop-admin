import { Box, Button, Container, Grid, Typography } from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField/TextField';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from 'src/hooks/useRequest';
import { path } from 'src/constants/path';
import { toast } from 'react-toastify';
import { useAuthContext } from 'src/contexts/AuthContext';
import { saveProfile } from 'src/utils/util';

const TypographyH1 = styled(Typography)(
    ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`,
);

interface FormState {
    usernameOrEmail: string;
    password: string;
}

function Hero() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormState>({
        defaultValues: {
            usernameOrEmail: '',
            password: '',
        },
    });

    const loginMutation = useLoginMutation();
    const { setIsAuthenticated, setProfile } = useAuthContext();

    const handleLogin = (data: FormState) => {
        loginMutation.mutate(
            {
                loginInput: data,
            },
            {
                onSuccess: (data) => {
                    if (data.success === false) {
                        toast.error(JSON.stringify(data.message));
                        return;
                    }
                    saveProfile(data.user);
                    setIsAuthenticated(true);
                    setProfile(data.user);
                    navigate(path.overview);
                },
                onError(error: any) {
                    toast.error(
                        JSON.stringify(error.response.errors[0].message),
                    );
                },
            },
        );
    };

    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Grid
                spacing={{ xs: 6, md: 10 }}
                justifyContent="center"
                alignItems="center"
                container
            >
                <Grid item md={10} lg={8} mx="auto">
                    <TypographyH1 sx={{ mb: 2 }} variant="h1">
                        Sign in
                    </TypographyH1>
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
                        onSubmit={handleSubmit(handleLogin)}
                    >
                        <TextField
                            id="standard-password-input"
                            label="UserName"
                            type="username"
                            autoComplete="current-password"
                            variant="standard"
                            fullWidth
                            {...register('usernameOrEmail')}
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            fullWidth
                            {...register('password')}
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
                                disabled={loginMutation.isLoading}
                                type="submit"
                                fullWidth
                            >
                                Sign in
                            </Button>
                            <Button
                                sx={{ mt: 2 }}
                                component="a"
                                target="_blank"
                                rel="noopener"
                                href="https://bloomui.com/product/tokyo-free-white-react-typescript-material-ui-admin-dashboard"
                                size="large"
                                variant="text"
                                fullWidth
                            >
                                Forgot password ?
                            </Button>{' '}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Hero;
