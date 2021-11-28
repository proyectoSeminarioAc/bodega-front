import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";

function SkeletonListComponent({fetching}) {
    const skeletonArray = Array(10).fill('');
    return fetching ? skeletonArray.map((item, index) => (
        <TableRow key={index}>
            <TableCell component="th" scope="row">
                <Skeleton/>
            </TableCell>
            <TableCell component="th" scope="row">
                <Skeleton/>
            </TableCell>
            <TableCell component="th" scope="row">
                <Skeleton/>
            </TableCell>
            <TableCell component="th" scope="row">
                <Skeleton/>
            </TableCell>
            <TableCell component="th" scope="row">
                <Skeleton/>
            </TableCell>
        </TableRow>
    )) : null
}


export default SkeletonListComponent;
