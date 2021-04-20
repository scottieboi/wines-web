import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import * as React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { EndpointName } from "../../../api";
import { Loading } from "../../Common/Loading";

interface FindWineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: "250px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4),
  },
  table: {
    marginBottom: theme.spacing(2),
  },
}));

const FindWineModal: React.FunctionComponent<FindWineModalProps> = (
  props: FindWineModalProps
) => {
  const { isOpen, onClose } = props;
  const classes = useStyles();

  const loading = useAppSelector(
    (state) => state.fetchingData[EndpointName.FindWineById]
  );
  const data = useAppSelector((state) => state.findWineResponse);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        {loading || data === null ? (
          <Loading />
        ) : (
          <>
            <DialogTitle>Wine details</DialogTitle>
            <Table size="small" className={classes.table}>
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
                <TableRow key={data.id}>
                  <TableCell>{data.wineName}</TableCell>
                  <TableCell>{data.wineType}</TableCell>
                  <TableCell>{data.vineyard}</TableCell>
                  <TableCell>{data.vintage}</TableCell>
                  <TableCell align="right">
                    {
                      // Sum of all boxes
                      data.boxes.reduce((total, b) => total + b.qty, 0)
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table size="small" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Box Number</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.boxes.map((item) => (
                  <TableRow key={item.boxNo}>
                    <TableCell align="right">{item.boxNo}</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default FindWineModal;
