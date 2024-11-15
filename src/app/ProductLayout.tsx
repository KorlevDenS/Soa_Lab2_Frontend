import {Product} from "../model";
import Card from '@mui/material/Card';
import {useState} from "react";
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import {red} from "@mui/material/colors";
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import StraightIcon from '@mui/icons-material/Straight';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import HeightIcon from '@mui/icons-material/Height';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';

interface ProductLayoutProps {
    product: Product;
}

export default function ProductLayout({product}: ProductLayoutProps) {
    const [openCoordinates, setOpenCoordinates] = useState(false);
    const [openOwner, setOpenOwner] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);

    const handleCoordinates = () => {
        setOpenCoordinates(!openCoordinates);
    };

    const handleOwner = () => {
        setOpenOwner(!openOwner);
    };

    const handleLocation = () => {
        setOpenLocation(!openLocation);
    };

    return (
        <Card sx={{ width: 450 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label={product.name ?? "?"}>
                        {!product.name ? "?" : product.name[0]}
                    </Avatar>
                }
                title={"№" + (product.id ?? "-") + " " + (product.name ?? "-")}
                subheader={"Creation date: " + (product.creationDate ?? "-")}
            />
            <Divider/>
            <CardContent>
                <List disablePadding>
                    <ListItemButton onClick={handleCoordinates}>
                        <ListItemIcon>
                            <PivotTableChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Coordinates" />
                        {openCoordinates ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {product.coordinates && (
                        <Collapse in={openCoordinates} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItem sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <TrendingFlatIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"X: " + product.coordinates.x} />
                                </ListItem>
                                <ListItem sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <StraightIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Y: " + product.coordinates.y} />
                                </ListItem>
                            </List>
                        </Collapse>
                    )}
                    <ListItem>
                        <ListItemIcon>
                            <AttachMoneyIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Price: " + (product.price ?? "-")} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FormatListNumberedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Part number: " + (product.partNumber ?? "-")} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <RequestQuoteIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Manufacture cost: " + (product.manufactureCost ?? "-")} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <SquareFootIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Unit of measure: " + (product.unitOfMeasure ?? "-")} />
                    </ListItem>
                    <ListItemButton onClick={handleOwner}>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Owner" />
                        {openOwner ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {product.owner && (
                        <Collapse in={openOwner} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItem sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <BadgeIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Name: " + (product.owner.name ?? "-")} />
                                </ListItem>
                                <ListItem sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <CalendarMonthIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Birthday: " + (product.owner.birthday ?? "-")} />
                                </ListItem>
                                <ListItem sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <HeightIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Height: " + (product.owner.height ?? "-")} />
                                </ListItem>
                                <ListItem sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <ContactPageIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Passport ID: " + (product.owner.passportID ?? "-")} />
                                </ListItem>
                                <ListItemButton sx={{ pl: 4 }} onClick={handleLocation}>
                                    <ListItemIcon>
                                        <LocationOnIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Location" />
                                    {openLocation ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                {product.owner.location && (
                                    <Collapse in={openOwner && openLocation} timeout="auto" unmountOnExit>
                                        <List disablePadding>
                                            <ListItem sx={{ pl: 8 }}>
                                                <ListItemIcon>
                                                    <TrendingFlatIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={"X: " + (product.owner.location.x ?? "-")} />
                                            </ListItem>
                                            <ListItem sx={{ pl: 8 }}>
                                                <ListItemIcon>
                                                    <StraightIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={"Y: " + (product.owner.location.y ?? "-")} />
                                            </ListItem>
                                            <ListItem sx={{ pl: 8 }}>
                                                <ListItemIcon>
                                                    <LocationCityIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={"Name: " + (product.owner.location.name ?? "-")} />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                )}
                            </List>
                        </Collapse>
                    )}
                </List>
            </CardContent>
        </Card>
    );
}