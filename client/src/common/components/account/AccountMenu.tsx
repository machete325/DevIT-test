import React from 'react';
import {
    Backdrop,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import { PopoverProps } from '@mui/material/Popover';
import { makeStyles } from 'tss-react/mui';
import { LOGIN_ROUTE } from '../../constants/routes';
import {
    removeAccessToken,
    removeRefreshToken,
} from '../../../utils/authUtils';
import { User } from '../../../types/users/User';

const useStyles = makeStyles()(({ spacing, palette }) => ({
    menu: {
        marginTop: spacing(2),
        borderRadius: 28,
        width: 370,
        backgroundColor: palette.background.default,
        '& .MuiList-root': {
            padding: spacing(1),
        },
    },
    menuUserBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: palette.background.paper,
        borderRadius: '28px 28px 5px 5px',
        padding: spacing(1),
        '& svg': {
            fontSize: '70px',
        },
    },
}));

interface Props {
    anchorEl: PopoverProps['anchorEl'];
    onClose: VoidFunction;
    user: User | null;
}

export const AccountMenu = (props: Props) => {
    const { classes, cx } = useStyles();
    const { anchorEl, onClose, user } = props;
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        removeAccessToken();
        removeRefreshToken();
        window.location.href = LOGIN_ROUTE;
    };

    return (
        <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={onClose}
        >
            <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={onClose}
                elevation={0}
                PaperProps={{
                    className: cx(classes.menu),
                }}
            >
                <Grid
                    container
                    className={cx(classes.menuUserBox)}
                >
                    <Grid
                        item
                        xs={3}
                    >
                        <AccountCircle />
                    </Grid>

                    <Grid
                        item
                        xs={9}
                    >
                        <Typography>{user?.firstName} {user?.lastName}</Typography>

                        <Typography variant='caption'>{user?.email}</Typography>
                    </Grid>
                </Grid>

                <List>
                    <ListItemButton sx={{ borderRadius: 16 }}
                        onClick={handleLogout}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>

                        <ListItemText primary='Logout' />
                    </ListItemButton>
                </List>
            </Menu>
        </Backdrop>
    );
};
