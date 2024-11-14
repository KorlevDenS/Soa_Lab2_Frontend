import './Products.css';
import React, {useState} from "react";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

interface ProductsProps {
    open: boolean;
    handleDrawerChange(isOpen: boolean): void;
}

export default function Products({open, handleDrawerChange}: ProductsProps) {



    return (
        <Box className="Products" sx={{display: 'flex'}}>
            <MuiDrawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Toolbar sx={{marginTop: '1rem'}}/>
                <DrawerHeader>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 'normal',
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Search options
                    </Typography>
                    <IconButton onClick={() => handleDrawerChange(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                Something to filter
            </MuiDrawer>
            <Main open={open}>
                <Box>
                    Products
                </Box>
            </Main>
        </Box>
    );
}