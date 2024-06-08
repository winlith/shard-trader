import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

function ErrorView() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ErrorIcon color="error" sx={{ fontSize: 512 }} />
            <Typography variant="h2" sx={{ textAlign: 'center' }}>
                Getting data from Universalis failed.
                <br />
                Try again later.
            </Typography>
        </Box>
    );
}

export default ErrorView;
