import { Box, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

function PlaceholderView() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <RefreshIcon color="disabled" sx={{ fontSize: 512 }} />
            <Typography variant="h2">Check the market first</Typography>
        </Box>
    );
}

export default PlaceholderView;
