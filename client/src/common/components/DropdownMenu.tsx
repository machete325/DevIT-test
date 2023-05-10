import { PopoverProps } from '@mui/material/Popover';
import {
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import React from 'react';
import SvgIcon from '@mui/material/SvgIcon/SvgIcon';
import { map } from 'lodash';

export interface DropdownMenuItem {
    name: string;
    icon?: typeof SvgIcon;
    disabled?: boolean;
    onClick: (...args: any) => void;
}

export interface DropdownMenuProps {
    id: string;
    anchorEl: PopoverProps['anchorEl'];
    onClose: VoidFunction;
    items: DropdownMenuItem[];
}

export const DropdownMenu = (props: DropdownMenuProps) => {
    const { id, anchorEl, items, onClose } = props;

    return (
        <Menu
            id={id}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={onClose}
        >
            {map(items, ({ name, disabled, icon: Icon, onClick }, key) => (
                <MenuItem
                    key={key}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {Icon && (
                        <ListItemIcon>
                            <Icon fontSize="small"/>
                        </ListItemIcon>
                    )}

                    <ListItemText>{name}</ListItemText>
                </MenuItem>
            ))}
        </Menu>
    );
};
