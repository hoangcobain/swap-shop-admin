import { useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
    Avatar,
    Box,
    Button,
    Divider,
    Hidden,
    lighten,
    List,
    ListItem,
    ListItemText,
    Popover,
    Typography,
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { useLogoutMutaion, useMeQuery } from 'src/hooks/useRequest';
import { path } from 'src/constants/path';
import { useAuthContext } from 'src/contexts/AuthContext';

const UserBoxButton = styled(Button)(
    ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`,
);

const MenuUserBox = styled(Box)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`,
);

const UserBoxDescription = styled(Typography)(
    ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`,
);

function HeaderUserbox() {
    const { profile, setProfile, setIsAuthenticated } = useAuthContext();

    const ref = useRef<any>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    const logoutMutation = useLogoutMutaion();

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleLogOut = (): void => {
        logoutMutation.mutate();
        setProfile(null);
        setIsAuthenticated(false);
    };

    if (!Boolean(profile)) {
        return <div>Not have profile</div>;
    }

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Avatar
                    variant="rounded"
                    alt={profile.username}
                    src={
                        profile.avatar ||
                        'https://www.google.com.vn/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb6%2FImage_created_with_a_mobile_phone.png%2F640px-Image_created_with_a_mobile_phone.png&tbnid=JoR7JNzGko0S6M&vet=12ahUKEwij1oubwfz9AhXCtVYBHW0iD5gQMygAegUIARDCAQ..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&docid=0JWe7yDOKrVFAM&w=640&h=480&q=image&ved=2ahUKEwij1oubwfz9AhXCtVYBHW0iD5gQMygAegUIARDCAQ'
                    }
                />
                <Hidden mdDown>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">
                            {profile.username}
                        </UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {profile.email}
                        </UserBoxDescription>
                    </UserBoxText>
                </Hidden>
                <Hidden smDown>
                    <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
                </Hidden>
            </UserBoxButton>
            <Popover
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuUserBox sx={{ minWidth: 210 }} display="flex">
                    <Avatar
                        variant="rounded"
                        alt={profile.username}
                        src={
                            profile.avatar ||
                            'https://www.google.com.vn/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb6%2FImage_created_with_a_mobile_phone.png%2F640px-Image_created_with_a_mobile_phone.png&tbnid=JoR7JNzGko0S6M&vet=12ahUKEwij1oubwfz9AhXCtVYBHW0iD5gQMygAegUIARDCAQ..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&docid=0JWe7yDOKrVFAM&w=640&h=480&q=image&ved=2ahUKEwij1oubwfz9AhXCtVYBHW0iD5gQMygAegUIARDCAQ'
                        }
                    />
                    <UserBoxText>
                        <UserBoxLabel variant="body1">
                            {profile.username}
                        </UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {profile.email}
                        </UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Divider sx={{ mb: 0 }} />
                <List sx={{ p: 1 }} component="nav">
                    <ListItem
                        button
                        to="/management/profile/settings"
                        component={NavLink}
                    >
                        <AccountTreeTwoToneIcon fontSize="small" />
                        <ListItemText primary="Account Settings" />
                    </ListItem>
                </List>
                <Divider />
                <Box sx={{ m: 1 }}>
                    <Button
                        color="primary"
                        fullWidth
                        onClick={handleLogOut}
                        disabled={logoutMutation.isLoading}
                    >
                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

export default HeaderUserbox;
