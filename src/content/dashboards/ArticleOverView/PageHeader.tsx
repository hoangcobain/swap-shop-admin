import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuthContext } from 'src/contexts/AuthContext';
import { useMeQuery } from 'src/hooks/useRequest';
import { User } from 'src/types/user.type';

function PageHeader() {
    const { profile } = useAuthContext();
    console.log(profile);
    const theme = useTheme();

    return (
        <Grid container alignItems="center">
            <Grid item>
                <Avatar
                    sx={{
                        mr: 2,
                        width: theme.spacing(8),
                        height: theme.spacing(8),
                    }}
                    variant="rounded"
                    alt={profile?.username}
                    src={profile?.avatar}
                />
            </Grid>
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Welcome, {profile?.username}!
                </Typography>
                <Typography variant="subtitle2">Best luck for you</Typography>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
