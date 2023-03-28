import { Typography, Button, Grid, Modal } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useAuthContext } from 'src/contexts/AuthContext';

interface PageHeaderProps {
    title: string;
    buttonName: string;
    renderModal?: React.ReactElement;
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

function PageHeader({
    title,
    buttonName,
    renderModal,
    handleClose,
    handleOpen,
    open,
}: PageHeaderProps) {
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
                <Button
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                    onClick={handleOpen}
                >
                    {buttonName}
                </Button>
                {renderModal && (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {renderModal}
                    </Modal>
                )}
            </Grid>
        </Grid>
    );
}

export default PageHeader;
