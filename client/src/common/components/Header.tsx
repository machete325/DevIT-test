import React, {
    useEffect,
    useState,
    useMemo,
} from 'react';
import {
    AppBar,
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AccountMenu } from './account/AccountMenu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { userSelector } from '../../store/selectors/user/userSelector';
import { getAvailablePostsAction } from '../../store/actions';
import { postQueriesSelector } from '../../store/selectors/post/postQueriesSelector';
import { PostQueries } from '../../types/post/PostQueries';

const useStyles = makeStyles()(({ palette, spacing }) => ({
    wrapper: {
        borderRadius: 4,
        marginBottom: spacing(1.5),
    },
    appBar: {
        boxShadow: 'none',
        background: palette.common.white,
        color: palette.text.primary,
    },
    search: {
        flexGrow: 1,
        maxWidth: '350px',
        '& .MuiInputBase-root': {
            height: '40px',
        },
    },
}));

export const Header = () => {
    const { classes, cx } = useStyles();
    const dispatch = useDispatch();
    const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [search, setSearch] = useState<string>('');
    const user = useSelector(userSelector);
    const postQueries = useSelector(postQueriesSelector);

    const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAccountMenuAnchorEl(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchorEl(null);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const params: PostQueries = useMemo(() => {
        return postQueries;
    }, [postQueries]);

    useEffect(() => {
        const delayedSetPostQueries = setTimeout(() => {

            dispatch(getAvailablePostsAction.request({ ...params, search, page: 1 }));

        }, search ? 1000 : 0);

        return () => clearTimeout(delayedSetPostQueries);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <Box className={cx(classes.wrapper)}>
            <AppBar
                position='static'
                className={classes.appBar}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <Typography>DevIT test</Typography>
                    </Box>

                    <TextField
                        className={classes.search}
                        variant="outlined"
                        label='search'
                        value={search}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchOutlinedIcon/></InputAdornment>,
                        }}
                    />

                    <IconButton
                        size='large'
                        edge='end'
                        onClick={handleAccountMenuOpen}
                        color='inherit'
                    >
                        <AccountCircle/>
                    </IconButton>

                    <AccountMenu
                        anchorEl={accountMenuAnchorEl}
                        onClose={handleAccountMenuClose}
                        user={user}
                    />

                </Toolbar>
            </AppBar>
        </Box>
    );
};
