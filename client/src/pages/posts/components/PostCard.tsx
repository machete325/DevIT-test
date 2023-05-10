import React, {
    useCallback,
    useMemo,
    useState,
} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from 'tss-react/mui';
import { useDispatch } from 'react-redux';
import {
    deletePostAction,
    openPostEditorAction,
} from '../../../store/actions/post';
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuItem,
} from '../../../common/components/DropdownMenu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles()(({ spacing }) => ({
    card: {
        padding: spacing(1.5, 2),
        width: 480,
        height: 550,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardHeader: {
        padding: 0,
    },
    cardContent: {
        marginTop: spacing(1),
        padding: 0,
    },
    content: {
        fontFamily: 'Roboto',
    },
    image: {
        maxWidth: '420px',
        width: '420px',
        maxheight: '300px',
    },
    cardActions: {
        padding: 0,
        justifyContent: 'end',
    },
}));

interface Props {
    id: number;
    title: string;
    creator: string;
    link: string;
    imgSrc: string;
    content: string;
    contentSnippet: string;
    categories: string[];
    pubDate: string;
}

export const PostCard = (props: Props) => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const { id,
        title,
        creator,
        link,
        imgSrc,
        content } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = useCallback(() => {
        dispatch(deletePostAction.request(id));
        handleMenuClose();
    }, [dispatch, id]);

    const handleEdit = useCallback(() => {
        dispatch(
            openPostEditorAction({
                creation: false,
                values: props,
            }),
        );
        handleMenuClose();
    }, [dispatch, props]);

    const dropdownMenuItems = useMemo<DropdownMenuItem[]>(() => [
        {
            name: 'Edit',
            icon: EditIcon,
            onClick: handleEdit,
        },
        {
            name: 'Delete',
            icon: DeleteIcon,
            onClick: handleDelete,
        },
    ], [handleDelete, handleEdit]);

    return (
        <Card
            elevation={0}
            className={classes.card}
            variant='outlined'
        >
            <Box>
                <CardHeader
                    action={
                        <React.Fragment>
                            <IconButton onClick={handleMenuOpen}
                                aria-label='settings'
                            >
                                <MoreVertIcon/>
                            </IconButton>

                            <DropdownMenu
                                id='post-actions-menu'
                                anchorEl={anchorEl}
                                items={dropdownMenuItems}
                                onClose={handleMenuClose}
                            />
                        </React.Fragment>
                    }
                    title={title}
                    subheader={creator}
                    className={classes.cardHeader}
                />
            </Box>

            <CardContent>
                <img className={classes.image}
                    alt={title}
                    src={imgSrc}
                />
                <div className={classes.content}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </CardContent>

            <CardActions
                className={classes.cardActions}
                disableSpacing
            >
                <Button
                    variant='contained'
                    component={Link}
                    to={link || `${id}/overview`}
                >
                    Go to
                </Button>
            </CardActions>
        </Card>
    );
};
