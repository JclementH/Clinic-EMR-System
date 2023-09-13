import { Box, Button, Modal } from "@mui/material";
import TeethColumn from "./TeethColumn";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import {
  CHANGE_BOT,
  CHANGE_LEFT,
  CHANGE_MID,
  CHANGE_RIGHT,
  CHANGE_TOP,
  TEETH_GRAY,
} from "./Constant";

const TeethModal = ({ show, handleClose, teeth, dispatch }) => {
  const [currentTeeth, setCurrentTeeth] = useState(teeth);

  useEffect(() => {
    setCurrentTeeth(teeth);
  }, [teeth]);

  const handleChange = (event, dispatchType) => {
    dispatch({ type: dispatchType, payload: event.target.value });
    switch (dispatchType) {
      case CHANGE_TOP:
        setCurrentTeeth({ ...teeth, topTeeth: event.target.value });
        return;
      case CHANGE_BOT:
        setCurrentTeeth({ ...teeth, bottomTeeth: event.target.value });
        return;
      case CHANGE_LEFT:
        setCurrentTeeth({ ...teeth, leftTeeth: event.target.value });
        return;
      case CHANGE_RIGHT:
        setCurrentTeeth({ ...teeth, rightTeeth: event.target.value });
        return;
      case CHANGE_MID:
        setCurrentTeeth({ ...teeth, middleTeeth: event.target.value });
        return;
      default:
        throw new Error("unexpected action type" + dispatchType.type);
    }
  };
  return (
    <Modal open={show} onClose={handleClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          width: "1500px",
          height: "1000px",
          padding: "16px",
          maxWidth: "80vw",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "1rem",
          }}
        >
          <TeethColumn
            color={currentTeeth.topTeeth ?? TEETH_GRAY}
            label={"Top Teeth"}
          >
            <Dropdown
              teethColor={currentTeeth.topTeeth ?? TEETH_GRAY}
              handleChange={handleChange}
              dispatchType={CHANGE_TOP}
            />
          </TeethColumn>
          <TeethColumn
            color={currentTeeth.bottomTeeth ?? TEETH_GRAY}
            label={"Bottom Teeth"}
          >
            <Dropdown
              teethColor={currentTeeth.bottomTeeth ?? TEETH_GRAY}
              handleChange={handleChange}
              dispatchType={CHANGE_BOT}
            />
          </TeethColumn>
          <TeethColumn color={currentTeeth.leftTeeth} label={"Left Teeth"}>
            <Dropdown
              teethColor={currentTeeth.leftTeeth ?? TEETH_GRAY}
              handleChange={handleChange}
              dispatchType={CHANGE_LEFT}
            />
          </TeethColumn>
          <TeethColumn color={currentTeeth.rightTeeth} label={"Right Teeth"}>
            <Dropdown
              teethColor={currentTeeth.rightTeeth ?? TEETH_GRAY}
              handleChange={handleChange}
              dispatchType={CHANGE_RIGHT}
            />
          </TeethColumn>
          <TeethColumn color={currentTeeth.middleTeeth} label={"Middle Teeth"}>
            <Dropdown
              teethColor={currentTeeth.middleTeeth ?? TEETH_GRAY}
              handleChange={handleChange}
              dispatchType={CHANGE_MID}
            />
          </TeethColumn>
        </div>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default TeethModal;
