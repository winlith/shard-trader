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
import { SingleCalculation } from './types';
import { getItemName, getWorldName } from './ids';

export interface CalcResultProps {
    calculation: SingleCalculation;
}

function CalcResult(props: CalcResultProps) {
    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    mt: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    alt="logo"
                    src={`https://universalis-ffxiv.github.io/universalis-assets/icon2x/${props.calculation.shardId}.png`}
                    style={{
                        width: '32px',
                        height: '32px',
                        marginRight: '5px',
                    }}
                ></img>
                <Typography>
                    {getItemName(props.calculation.shardId)}
                </Typography>
            </Box>
            <TableContainer component={Box}>
                <Table size="small">
                    <TableBody
                        sx={{
                            td: {
                                border: 0,
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell sx={{ textAlign: 'right' }}>
                                Shard sale price:
                            </TableCell>
                            <TableCell>
                                {props.calculation.shardSalePrice}gil
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'right' }}>
                                Seed price:
                            </TableCell>
                            <TableCell>
                                {props.calculation.seedPrice}gil on{' '}
                                {getWorldName(props.calculation.seedWorldId)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'right' }}>
                                Soil price:
                            </TableCell>
                            <TableCell>
                                {props.calculation.soilPrice}gil on{' '}
                                {getWorldName(props.calculation.soilWorldId)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'right' }}>
                                Profit per plant:
                            </TableCell>
                            <TableCell>
                                {props.calculation.profitPerPlant}gil
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'right' }}>
                                Total profit:
                            </TableCell>
                            <TableCell>
                                {props.calculation.totalProfit}gil
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default CalcResult;
