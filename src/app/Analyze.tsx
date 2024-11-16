import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import StandardTextField from "./StandardTextField";
import React, {useState} from "react";
import {Product, RequestMessage} from "../model";
import ErrorLayout from "./ErrorLayout";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import ProductLayout from "./ProductLayout";


export default function Analyze() {
    const [unitOfMeasure, setUnitOfMeasure] = useState<string>("");
    const [ownerPassportID, setOwnerPassportID] = useState<string>("");
    const [substring, setSubstring] = useState<string>("");

    const [countByUnit, setCountByUnit] = useState<string>("-");
    const [countByOwner, setCountByOwner] = useState<string>("-");
    const [products, setProducts] = useState<Product[]>([]);

    const [errorComponent, setErrorComponent] = useState<RequestMessage | undefined>(undefined);


    const findCountByOwner = async () => {
        try {
            await fetch("api1/products/owner/" + ownerPassportID + "/count", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.ok) {
                    const responseData = response.json();
                    responseData.then(value => {
                        setCountByOwner(value as string);
                    })
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

    const findCountByUnit = async () => {
        try {
            await fetch("api1/products/unitOfMeasure/" + unitOfMeasure + "/count", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.ok) {
                    const responseData = response.json();
                    responseData.then(value => {
                        setCountByUnit(value as string);
                    })
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

    const findBySubstring = async () => {
        const params = new URLSearchParams();
        params.append("substring", substring);
        try {
            await fetch("api1/products/partNumber/search?" + params.toString(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.ok) {
                    const responseData = response.json();
                    responseData.then(value => {
                        setProducts(value as Product[]);
                    })
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

    const handleCountByOwner = () => {
        setCountByOwner("-");
        setErrorComponent(undefined);
        findCountByOwner().then();
    };

    const handleCountByUnit = () => {
        setCountByUnit("-");
        setErrorComponent(undefined);
        findCountByUnit().then();
    };

    const handleCountBySubstring = () => {
        setProducts([]);
        setErrorComponent(undefined);
        findBySubstring().then();
    };

    return (
        <Box sx={{display: 'flex'}}>
            <Stack spacing={2}>
                <Grid container justifyContent={"space-evenly"}>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 'normal',
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >Analysing Products</Typography>
                </Grid>
                <Divider color={"white"}/>
                <Grid container justifyContent={"space-evenly"} spacing={8}>
                    <Stack spacing={2}>
                        Count by owner
                        <StandardTextField label="owner passport id" onChange={setOwnerPassportID} helperText={" "}/>
                        <Button onClick={handleCountByOwner} variant="contained">
                            Count by owner
                        </Button>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 'normal',
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >{countByOwner}</Typography>
                    </Stack>
                    <Stack spacing={2}>
                        Count by greater unit of measure
                        <StandardTextField label="unit of measure" onChange={setUnitOfMeasure}
                                           helperText="METERS, CENTIMETERS, MILLILITERS, GRAMS"/>
                        <Button onClick={handleCountByUnit} variant="contained">
                            Count by unit
                        </Button>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 'normal',
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >{countByUnit}</Typography>
                    </Stack>
                    <Stack spacing={2}>
                        Find products by partNumber substring
                        <StandardTextField label="substring" onChange={setSubstring}
                                           helperText=" "/>
                        <Button onClick={handleCountBySubstring} variant="contained">
                            Find
                        </Button>
                    </Stack>
                </Grid>
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
                <Divider color={"white"}/>
                <Divider />
            </Stack>
        </Box>
    );

}