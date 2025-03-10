import {
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { User } from 'src/types/user.type';

const Input = styled('input')({
    display: 'none',
});

const AvatarWrapper = styled(Card)(
    ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`,
);

const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`,
);

const CardCover = styled(Card)(
    ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`,
);

const CardCoverAction = styled(Box)(
    ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`,
);

const ProfileCover = ({ user }: { user: User }) => {
    return (
        <>
            <Box display="flex" mb={3}>
                <Tooltip arrow placement="top" title="Go back">
                    <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
                        <ArrowBackTwoToneIcon />
                    </IconButton>
                </Tooltip>
                <Box>
                    <Typography variant="h3" component="h3" gutterBottom>
                        Profile for {user.username}
                    </Typography>
                    <Typography variant="subtitle2">
                        This is a profile page. Easy to modify, always blazing
                        fast
                    </Typography>
                </Box>
            </Box>
            <CardCover>
                <CardMedia image={user.avatar || ''} />
                <CardCoverAction>
                    <Input
                        accept="image/*"
                        id="change-cover"
                        multiple
                        type="file"
                    />
                    <label htmlFor="change-cover">
                        <Button
                            startIcon={<UploadTwoToneIcon />}
                            variant="contained"
                            component="span"
                        >
                            Change cover
                        </Button>
                    </label>
                </CardCoverAction>
            </CardCover>
            <AvatarWrapper>
                <Avatar
                    variant="rounded"
                    alt={user.username}
                    src={user.avatar}
                />
                <ButtonUploadWrapper>
                    <Input
                        accept="image/*"
                        id="icon-button-file"
                        name="icon-button-file"
                        type="file"
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton component="span" color="primary">
                            <UploadTwoToneIcon />
                        </IconButton>
                    </label>
                </ButtonUploadWrapper>
            </AvatarWrapper>
            <Box py={2} pl={2} mb={3}>
                <Typography gutterBottom variant="h4">
                    {user.fullName}
                </Typography>
            </Box>
        </>
    );
};

ProfileCover.propTypes = {
    // @ts-ignore
    user: PropTypes.object.isRequired,
};

export default ProfileCover;
