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
import {Product, RequestMessage} from "../../model";
import ErrorLayout from "../ErrorLayout";
import Grid from '@mui/material/Grid2';
import ProductLayout from "../ProductLayout";
import Button from "@mui/material/Button";

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

    const [products, setProducts] = useState<Product[]>([]);
    const [errorComponent, setErrorComponent] = useState<RequestMessage | undefined>(undefined);

    const getProducts = async () => {
        try {
            await fetch("api1/products", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.ok) {
                    const data = response.json();
                    let productsArray: Product[];
                    data.then(value => {productsArray = value as Product[]})
                        .then(() => setProducts(productsArray));
                } else {
                    const responseData = response.json();
                    responseData.then(value => {
                        setErrorComponent(value as RequestMessage);
                    })
                }
            });
        } catch (error) {
            setErrorComponent(new RequestMessage(504, "Error sending data: " + error));
        }
    };

    const handleGetProducts = () => {
        setProducts([]);
        setErrorComponent(undefined);
        getProducts().then(() => {});
    };

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
                <Button onClick={handleGetProducts}>Find products</Button>
            </MuiDrawer>
            <Main open={open}>
                <Box>
                    {errorComponent !== undefined && (
                        <ErrorLayout requestMessage={errorComponent}/>
                    )}
                    <Grid container justifyContent={"space-evenly"} spacing={2}>
                        {products.map((product) => (
                            <Grid key={product.id}>
                                <ProductLayout product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Main>
        </Box>
    );
}