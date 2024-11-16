import './Products.css';
import React, {useEffect, useState} from "react";
import {styled} from '@mui/material/styles';
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
import Pagination from '@mui/material/Pagination';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const drawerWidth = 350;
const initPageSize = "6";

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
    const [pagesAmount, setPagesAmount] = useState<number>(10);
    const [pageSize, setPageSize] = useState<string>(initPageSize);
    const [page, setPage] = useState<number>(1);
    const [requestParams, setRequestParams] = useState<Map<string, string>>(new Map());

    const [filterId, setFilterId] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [filterCreationDate, setFilterCreationDate] = useState<string>("");
    const [filterName, setFilterName] = useState<string>("");
    const [filterPrice, setFilterPrice] = useState<string>("");
    const [filterPartNumber, setFilterPartNumber] = useState<string>("");
    const [filterManufactureCost, setFilterManufactureCost] = useState<string>("");
    const [filterUnitOfMeasure, setFilterUnitOfMeasure] = useState<string>("");

    const installParams = (paramsMap: Map<string, string>) => {
        setRequestParams(
            new Map<string, string>(
                [...Array.from(paramsMap.entries())]
                    .filter(([key, value]) => value !== '')
            )
        );
    }

    const refreshPagesAmount = () => {
        findProducts(false).then(res => {
            if (res.ok) {
                const responseData = res.json();
                responseData.then(data => {
                    return data as Product[];
                }).then(ps => {
                    let productsAmount: number = ps.length;
                    if (productsAmount === 0) {
                        setPagesAmount(1);
                    } else {
                        let pgSz: number = (pageSize !== "0" && pageSize !== "") ? Number(pageSize) : Number(initPageSize);
                        setPagesAmount(
                            productsAmount % pgSz === 0 ?
                                (productsAmount / pgSz) : (((productsAmount / pgSz) | 0) + 1)
                        );
                    }
                });
            }
        });
    };

    useEffect(() => {
        refreshPagesAmount();
    }, []);

    const findProducts = async (withPagination: boolean = true): Promise<Response> => {
        const params = new URLSearchParams();
        if (withPagination) {
            requestParams.forEach( (value, key) => {
                params.append(key, value);
            });
        } else {
            new Map<string, string>(
                [...Array.from(requestParams.entries())]
                    .filter(([key, value]) => key !== 'page' && key !== 'size')
            ).forEach( (value, key) => {
                params.append(key, value);
            });
        }
        try {
            return await fetch("api1/products?" + params.toString(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            return new Response(JSON.stringify(new RequestMessage(504, "Error sending data: " + error)), {
                status: 504,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }

    const handleGetProducts = () => {
        setProducts([]);
        setErrorComponent(undefined);
        findProducts().then((res) => {
            if (res.ok) {
                const responseData = res.json();
                responseData.then(data => {
                    setProducts(data as Product[]);
                });
            } else {
                const responseData = res.json();
                responseData.then(data => {
                    setErrorComponent(data as RequestMessage);
                });
            }
        });
    };

    const pickParams = () => {
        installParams(new Map<string, string>([
            ["page", String(page)],
            ["size", (pageSize !== "0" && pageSize !== "") ? pageSize : initPageSize],
            ["id", filterId],
            ["name", filterName],
            ["creationDate", filterCreationDate],
            ["price", filterPrice],
            ["partNumber", filterPartNumber],
            ["manufactureCost", filterManufactureCost],
            ["unitOfMeasure", filterUnitOfMeasure],
            ["sort", sort]
        ]));
    };
    
    useEffect(() => {
        //installParams(new Map<string, string>([["page", String(page)],["size", String(pageSize)]]));
        pickParams();
    }, [page]);

    useEffect(() => {
        if (requestParams.size !== 0) {
            handleGetProducts();
        }
    }, [requestParams]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleApplyFilters = ()=> {
        refreshPagesAmount();
        if (page !== 1) {
            setPage(1);
        } else {
            //installParams(new Map<string, string>([["page", String(page)],["size", String(pageSize)]]));
            pickParams();
        }
    }

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

                <Stack spacing={4} mr={3} ml={3}>
                    <TextField variant="standard" color={"primary"} label="sort field name" onChange={(e) => setSort(e.target.value)}
                               helperText="id, name, coordinates, creationDate, price, partNumber, manufactureCost, unitOfMeasure, owner"/>
                    <Divider/>
                    <TextField variant="standard" color={"primary"} label="id" onChange={(e) => setFilterId(e.target.value)}/>
                    <TextField variant="standard" color={"primary"} label="creation date" onChange={(e) => setFilterCreationDate(e.target.value)} helperText="yyyy-mm-dd"/>
                    <TextField variant="standard" color={"primary"} label="name" onChange={(e) => setFilterName(e.target.value)}/>
                    <TextField variant="standard" color={"primary"} label="price" type={"number"} onChange={(e) => setFilterPrice(e.target.value)}/>
                    <TextField variant="standard" color={"primary"} label="part number" onChange={(e) => setFilterPartNumber(e.target.value)}/>
                    <TextField variant="standard" color={"primary"} label="manufacture cost" type={"number"} onChange={(e) => setFilterManufactureCost(e.target.value)}/>
                    <TextField variant="standard" color={"primary"} label="unit of measure" onChange={(e) => setFilterUnitOfMeasure(e.target.value)}
                                       helperText="METERS, CENTIMETERS, MILLILITERS, GRAMS"/>
                    <TextField variant="standard" color={"primary"} label="page size" type={"number"} onChange={(e) => setPageSize(e.target.value)}/>

                    <Button variant="outlined" onClick={handleApplyFilters}>Apply Filters</Button>
                </Stack>

            </MuiDrawer>
            <Main open={open}>
                <Box sx={{display: 'flex'}}>
                    <Stack spacing={3}>
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
                        <Grid container justifyContent={"space-evenly"}>
                            <Pagination
                                color={"primary"}
                                sx={{ "& .MuiPaginationItem-root": { color: "#fff"}}}
                                count={pagesAmount}
                                page={page}
                                onChange={handlePageChange}
                                size="large"
                            />
                        </Grid>
                    </Stack>
                </Box>
            </Main>
        </Box>
    );
}