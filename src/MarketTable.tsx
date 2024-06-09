import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { ApiListing } from './apiTypes';

export interface MarketTableProps {
    listings: ApiListing[];
    displayWorldName: boolean;
}

function MarketTable(props: MarketTableProps) {
    return (
        <TableContainer component={Box}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {props.displayWorldName && <TableCell>World</TableCell>}
                        <TableCell>Retainer</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.listings
                        .sort((a, b) => a.pricePerUnit - b.pricePerUnit)
                        .slice(0, 10)
                        .map((listing) => (
                            <TableRow
                                key={listing.listingID}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                {props.displayWorldName && (
                                    <TableCell>{listing.worldName}</TableCell>
                                )}
                                <TableCell>{listing.retainerName}</TableCell>
                                <TableCell>{listing.pricePerUnit}</TableCell>
                                <TableCell>{listing.quantity}</TableCell>
                                <TableCell>{listing.total}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MarketTable;
