import Box from "@mui/material/Box";
import React, {useState} from "react";
import {Product, RequestMessage} from "../model";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import StandardTextField from "./StandardTextField";
import {Button} from "@mui/material";
import ProductLayout from "./ProductLayout";
import ErrorLayout from "./ErrorLayout";

export default function Manage() {

    const [ownerPassportID, setOwnerPassportID] = useState<string>("");
    const [percent, setPercent] = useState<string>("");

    const [products, setProducts] = useState<Product[]>([]);
    const [errorComponent, setErrorComponent] = useState<RequestMessage | undefined>(undefined);


    const decreasePricesByPercent = async () => {
        try {
            await fetch("api2/ebay/price/decrease/" + (percent !== "" ? percent : "0"), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                const responseData = response.json();
                responseData.then(value => {
                    setErrorComponent(value as RequestMessage);
                })
            });
        } catch (error) {
            setErrorComponent(new RequestMessage(504, "Error sending data: " + error));
        }
    };


    const findProductsByOwner = async () => {
        try {
            await fetch("api2/ebay/filter/manufacturer/" + ownerPassportID, {
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

    const handleFindByOwner = () => {
        setProducts([]);
        setErrorComponent(undefined);
        findProductsByOwner().then();
    }

    const handleDecreaseByPercent = () => {
        setErrorComponent(undefined);
        decreasePricesByPercent().then();
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
                    >Managing Products</Typography>
                </Grid>
                <Divider color={"white"}/>
                <Grid container justifyContent={"space-evenly"} spacing={16}>
                    <Stack spacing={2}>
                        Get all products by manufacturer
                        <StandardTextField label="manufacturer passport id" onChange={setOwnerPassportID} helperText={" "}/>
                        <Button onClick={handleFindByOwner} variant="contained">
                             Find
                        </Button>
                    </Stack>
                    <Stack spacing={2}>
                        Decrease prices by percent
                        <StandardTextField label="percent" type={"number"} onChange={setPercent} helperText={"1 < % < 100"}/>
                        <Button onClick={handleDecreaseByPercent} variant="contained">
                            Decrease
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