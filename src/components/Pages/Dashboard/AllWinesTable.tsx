import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from "@material-ui/core";
import * as React from "react";
import { useApi } from "../../App/hooks";
import { AllWinesResponse, EndpointName } from "../../../api";
import FindWineModal from "./FindWineModal";

interface AllWinesTableProps {
  data: Array<AllWinesResponse>;
}

const AllWinesTable: React.FunctionComponent<AllWinesTableProps> = (
  props: AllWinesTableProps
) => {
  const [isOpen, setOpen] = React.useState(false);
  const callEndpoint = useApi(EndpointName.FindWineById);

  const onModalClose = () => {
    setOpen(false);
  };
  const onModalOpen = (id: number) => {
    setOpen(true);
    callEndpoint({ id: id.toString() });
  };

  const { data } = props;
  return (
    <>
      <FindWineModal isOpen={isOpen} onClose={onModalClose} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Vineyard</TableCell>
            <TableCell>Wine name</TableCell>
            <TableCell>Wine type</TableCell>
            <TableCell>Vintage</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link onClick={() => onModalOpen(item.id)}>
                  {item.vineyard}
                </Link>
              </TableCell>
              <TableCell>{item.wineName}</TableCell>
              <TableCell>{item.wineType}</TableCell>
              <TableCell>{item.vintage}</TableCell>
              <TableCell align="right">{item.qty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AllWinesTable;
