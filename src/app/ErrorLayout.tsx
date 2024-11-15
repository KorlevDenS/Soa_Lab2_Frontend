import {RequestMessage} from "../model";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ErrorLayoutProps {
    requestMessage: RequestMessage;
}

export default function ErrorLayout({requestMessage}: ErrorLayoutProps) {
    return (
        <Stack spacing={2}>
            <Typography variant="h4" color={"error"}>
                {"HTTP CODE: " + requestMessage.code}
            </Typography>
            <Typography variant="h6" color={"error"}>
                {"Message: " + requestMessage.message}
            </Typography>
        </Stack>
    );

}