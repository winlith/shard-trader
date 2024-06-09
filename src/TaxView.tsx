import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { ApiTaxRates } from './apiTypes';
import { cityIcons, getWorldName } from './ids';

export interface TaxViewProps {
    selectedWorldId: number;
    taxRates: ApiTaxRates | null;
}

function TaxView(props: TaxViewProps) {
    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '25px',
                padding: '15px',
            }}
        >
            <Typography
                variant="h6"
                sx={{ margin: '5px', textAlign: 'center' }}
            >
                Tax rates on {getWorldName(props.selectedWorldId)}
            </Typography>
            <TableContainer component={Box}>
                <Table size="small">
                    <TableBody
                        sx={{
                            td: {
                                border: 0,
                            },
                        }}
                    >
                        {Object.keys(props.taxRates!).map((key) => {
                            return (
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        <Box
                                            sx={{
                                                mt: '10px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'right',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <img
                                                alt={`city-icon-${key}`}
                                                src={cityIcons[key]}
                                            ></img>
                                            <Typography sx={{ ml: '5px' }}>
                                                {key}:
                                            </Typography>
                                            <Typography sx={{ ml: '15px' }}>
                                                {props.taxRates![key]}%
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TaxView;
