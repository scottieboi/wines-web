import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import * as React from "react";
import { AllWinesResponse } from "../ApiCalls";

interface AllWinesTableProps {
  data: Array<AllWinesResponse>;
}

const AllWinesTable: React.FunctionComponent<AllWinesTableProps> = (
  props: AllWinesTableProps
) => {
  const { data } = props;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Wine name</TableCell>
          <TableCell>Wine type</TableCell>
          <TableCell>Vineyard</TableCell>
          <TableCell>Vintage</TableCell>
          <TableCell align="right">Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.wineName}</TableCell>
            <TableCell>{item.wineType}</TableCell>
            <TableCell>{item.vineyard}</TableCell>
            <TableCell>{item.vintage}</TableCell>
            <TableCell align="right">{item.qty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllWinesTable;
