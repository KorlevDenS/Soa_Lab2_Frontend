import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import StandardTextField from "./StandardTextField";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useState} from "react";
import {Coordinates, Location, Product, Person, RequestMessage} from "../model";
import Button from "@mui/material/Button";
import ProductLayout from "./ProductLayout";
import ErrorLayout from "./ErrorLayout";
import Grid from '@mui/material/Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormControl} from "@mui/material";

const serverUrl: string = "api1/products";

const methods = new Map<string, string>([["read", "GET"],["add", "POST"],["update", "PUT"],["delete", "DELETE"]]);

export default function AddProduct() {

    const [id, setId] = useState<string>("");

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [partNumber, setPartNumber] = useState<string>("");
    const [manufactureCost, setManufactureCost] = useState<string>("");
    const [unitOfMeasure, setUnitOfMeasure] = useState<string>("");

    const [coordinateX, setCoordinateX] = useState<string>("");
    const [coordinateY, setCoordinateY] = useState<string>("");

    const [ownerName, setOwnerName] = useState<string>("");
    const [ownerBirthday, setOwnerBirthday] = useState<string>("");
    const [ownerHeight, setOwnerHeight] = useState<string>("");
    const [ownerPassportID, setOwnerPassportID] = useState<string>("");

    const [locationX, setLocationX] = useState<string>("");
    const [locationY, setLocationY] = useState<string>("");
    const [locationName, setLocationName] = useState<string>("");

    const [errorComponent, setErrorComponent] = useState<RequestMessage | undefined>(undefined);
    const [productComponent, setProductComponent] = useState<Product | undefined>(undefined);

    const [action, setAction] = useState<string>('add');

    const handleChangeAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAction((event.target as HTMLInputElement).value);
    };

    const submitData = async (json?: string) => {
        try {
            await fetch(serverUrl + (action !== "add" ? `/${id !== "" ? id : "0"}` : ""), {
                method: methods.get(action),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: json,
            }).then(response => {
                if (response.ok && action !== "delete") {
                    const responseData = response.json();
                    responseData.then(value => {
                        setProductComponent(value as Product);
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

    const handleSubmit = () => {
        setProductComponent(undefined);
        setErrorComponent(undefined);
        if (action === "read" || action === "delete") {
            submitData().then(() => {});
            return;
        }
        let coordinates: (Coordinates | undefined);
        if (coordinateX !== "" || coordinateY !== "") {
            coordinates = new Coordinates(
                !isNaN(Number(coordinateX)) && coordinateX !== "" ? Number(coordinateX) : undefined,
                !isNaN(Number(coordinateY)) && coordinateY !== ""  ? Number(coordinateY) : undefined
            );
        }
        let location: (Location | undefined);
        if (locationX !== "" || locationY !== "" || locationName !== "") {
            location = new Location(
                !isNaN(Number(locationX)) && locationX !== "" ? Number(locationX) : undefined,
                !isNaN(Number(locationY)) && locationY !== "" ? Number(locationY) : undefined,
                locationName !== "" ? locationName : undefined
            );
        }
        let owner: (Person | undefined);
        if (ownerName !== "" || ownerBirthday !== "" || ownerHeight !== ""
            || ownerPassportID !== "" || location !== undefined) {
            owner = new Person(
                ownerName !== "" ? ownerName : undefined,
                ownerBirthday !== "" ? ownerBirthday + "T00:00:00Z" : undefined,
                !isNaN(Number(ownerHeight)) && ownerHeight !== "" ? Number(ownerHeight) : undefined,
                ownerPassportID !== "" ? ownerPassportID : undefined,
                location
            );
        }
        let product: Product = new Product(
            undefined,
            name !== "" ? name : undefined,
            coordinates,
            undefined,
            !isNaN(Number(price)) && price !== "" ? Number(price) : undefined,
            partNumber !== "" ? partNumber : undefined,
            !isNaN(Number(manufactureCost)) && manufactureCost !== "" ? Number(manufactureCost) : undefined,
            unitOfMeasure !== "" ? unitOfMeasure : undefined,
            owner
        );
        const jsonData = JSON.stringify(product);
        submitData(jsonData).then(() => {});
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
                        >
                            {action === "add" && (
                                "Adding new Product"
                            )}
                            {action === "update" && (
                                "Updating Product"
                            )}
                            {action === "delete" && (
                                "Deleting Product"
                            )}
                            {action === "read" && (
                                "Reading Product"
                            )}
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={action}
                                onChange={handleChangeAction}
                                row
                            >
                                <FormControlLabel value="add" control={<Radio />} label="Create" />
                                <FormControlLabel value="read" control={<Radio />} label="Read" />
                                <FormControlLabel value="update" control={<Radio />} label="Update" />
                                <FormControlLabel value="delete" control={<Radio />} label="Delete" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                <Divider color={"white"} />
                {action !== "add" && (
                    <StandardTextField label="id of selected product" type={"number"} onChange={setId}/>
                )}
                {action !== "delete" && action !== "read" && (
                    <Stack direction="row" spacing={4}>
                        <Stack spacing={3}>
                            Product
                            <StandardTextField label="name" onChange={setName}/>
                            <StandardTextField label="price" type={"number"} onChange={setPrice}/>
                            <StandardTextField label="part number" onChange={setPartNumber}/>
                            <StandardTextField label="manufacture cost" type={"number"} onChange={setManufactureCost}/>
                            <StandardTextField label="unit of measure" onChange={setUnitOfMeasure}
                                               helperText="METERS, CENTIMETERS, MILLILITERS, GRAMS"/>
                        </Stack>
                        <Stack spacing={3}>
                            Coordinates
                            <StandardTextField label="x" type={"number"} onChange={setCoordinateX}/>
                            <StandardTextField label="y" type={"number"} onChange={setCoordinateY}/>
                        </Stack>
                        <Stack spacing={3}>
                            Owner
                            <StandardTextField label="name" onChange={setOwnerName}/>
                            <StandardTextField label="birthday" onChange={setOwnerBirthday} helperText="yyyy-mm-dd"/>
                            <StandardTextField label="height" type={"number"} onChange={setOwnerHeight}/>
                            <StandardTextField label="passport id" onChange={setOwnerPassportID}/>
                        </Stack>
                        <Stack spacing={3}>
                            Owner`s location
                            <StandardTextField label="x" type={"number"} onChange={setLocationX}/>
                            <StandardTextField label="y" type={"number"} onChange={setLocationY}/>
                            <StandardTextField label="name" onChange={setLocationName}/>
                        </Stack>
                    </Stack>
                )}
                <Button onClick={handleSubmit} variant="contained">
                    {action === "add" && (
                        "Create"
                    )}
                    {action === "update" && (
                        "Update"
                    )}
                    {action === "delete" && (
                        "Delete"
                    )}
                    {action === "read" && (
                        "Read"
                    )}
                </Button>
                {errorComponent !== undefined && (
                    <ErrorLayout requestMessage={errorComponent}/>
                )}
                {productComponent !== undefined && (
                    <ProductLayout product={productComponent}/>
                )}
                <Divider color={"white"}/>
                <Divider/>
            </Stack>
        </Box>
    );
}