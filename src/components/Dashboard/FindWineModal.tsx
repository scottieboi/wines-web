import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Paper,
  makeStyles,
} from "@material-ui/core";
import * as React from "react";
import { FindWineRespone } from "../../types";
import { Loading } from "../Loading";

interface FindWineModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: FindWineRespone | null;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "400px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const FindWineModal: React.FunctionComponent<FindWineModalProps> = (
  props: FindWineModalProps
) => {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const { isOpen, onClose, loading, data } = props;
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper style={modalStyle} className={classes.paper}>
        {loading || data === null ? (
          <Loading />
        ) : (
          <>
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
                <TableRow key={data.id}>
                  <TableCell>{data.wineName}</TableCell>
                  <TableCell>{data.wineType}</TableCell>
                  <TableCell>{data.vineyard}</TableCell>
                  <TableCell>{data.vintage}</TableCell>
                  <TableCell align="right">{data.boxes}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table size="small">
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
      </Paper>
    </Modal>
  );
};

export default FindWineModal;
