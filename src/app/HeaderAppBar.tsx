import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import {useState} from "react";

interface HeaderAppBarProps {
    open: boolean;
    handleDrawerChange(isOpen: boolean): void;
}

export default function HeaderAppBar({open, handleDrawerChange}: HeaderAppBarProps) {
    const [chapter, setChapter] = useState("");
    const navigate = useNavigate();

    const goTo = (to: string) => {
        navigate(to, {replace: false});
        setChapter(to);
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton sx={{visibility: !open && chapter === "products" ? 'visible' : 'hidden'}}
                                onClick={() => handleDrawerChange(true)}>
                        <SearchIcon
                            fontSize={"large"}
                        />
                    </IconButton>
                    <Button onClick={() => {goTo("products")}}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                PRODUCTS
                            </Typography>
                    </Button>
                    <Box  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button onClick={() => {goTo("analyze")}}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <QueryStatsIcon fontSize={"small"} sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5}} />
                                Analyze
                            </Box>
                        </Button>
                        <Button onClick={() => {goTo("manage")}}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <SettingsIcon fontSize={"small"} sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5}} />
                                Manage
                            </Box>
                        </Button>
                    </Box>
                    <Button onClick={() => {goTo("add")}}
                            sx={{ my: 2, color: 'white', display: 'block' }}>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <AddIcon fontSize={"small"} sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5}} />
                            Add product
                        </Box>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
