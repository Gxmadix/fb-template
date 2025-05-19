import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';

const MenuDrawer = ({ open, onClose }: { open: boolean; onClose: (event: React.KeyboardEvent | React.MouseEvent) => void }) => (
    <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
            '& .MuiDrawer-paper': {
                top: '64px',
                height: 'calc(100% - 64px)',
            },
        }}
    >
        <List>
            <ListItem component={Link} to="/">
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={Link} to="/login">
                <ListItemIcon>
                    <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
            </ListItem>
        </List>
    </Drawer>
);

export default MenuDrawer; 