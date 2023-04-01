import { Typography, Button, Grid, Modal } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useAuthContext } from 'src/contexts/AuthContext';
import Popover from 'src/components/Popover';

interface PageHeaderProps {
    title: string;
    buttonName: string;
    modal: React.ReactElement;
}

function PageHeader({ title, buttonName, modal }: PageHeaderProps) {
    const { profile } = useAuthContext();

    if (!profile) return <div>Not have profile</div>;

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="subtitle2">
                    {profile.username}, these are your recent transactions
                </Typography>
            </Grid>
            <Grid item>
                <Popover renderPopover={modal}>
                    <Button
                        sx={{ mt: { xs: 2, md: 0 } }}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                        {buttonName}
                    </Button>
                </Popover>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
