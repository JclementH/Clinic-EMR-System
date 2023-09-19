import { useReducer, Fragment } from "react";
import { map } from "lodash";
import { produce } from "immer";
import TeethObject from "../components/TeethObject";
import TeethModal from "../components/TeethModal";
import {
  TEETH_BLUE,
  TEETH_GRAY,
  TEETH_GREEN,
  TEETH_RED,
  TEETH_YELLOW,
  CHANGE_TOP,
  CHANGE_BOT,
  CHANGE_LEFT,
  CHANGE_RIGHT,
  CHANGE_MID,
} from "../components/Constant";
import { Box } from "@mui/material";

const SET_MODAL_ON = "set-modal-on";
const SET_MODAL_OFF = "set-modal-off";
const MODAL_VALUE = "modal-value";
const EMPTY_VALUE = "empty-value";

class TeethSet {
  teethNumber = 0;
  teethRow = 0;
  topTeeth = TEETH_BLUE;
  bottomTeeth = TEETH_RED;
  leftTeeth = TEETH_GREEN;
  rightTeeth = TEETH_YELLOW;
  middleTeeth = TEETH_GRAY;

  constructor(number, row) {
    this.teethNumber = number;
    this.teethRow = row;
  }
}

const initialTeethState1 = [
  new TeethSet(55, 1),
  new TeethSet(54, 1),
  new TeethSet(53, 1),
  new TeethSet(52, 1),
  new TeethSet(51, 1),
  new TeethSet(61, 1),
  new TeethSet(62, 1),
  new TeethSet(63, 1),
  new TeethSet(64, 1),
  new TeethSet(65, 1),
];

const initialTeethState2 = [
  new TeethSet(18, 2),
  new TeethSet(17, 2),
  new TeethSet(16, 2),
  new TeethSet(15, 2),
  new TeethSet(14, 2),
  new TeethSet(13, 2),
  new TeethSet(12, 2),
  new TeethSet(11, 2),
  new TeethSet(21, 2),
  new TeethSet(22, 2),
  new TeethSet(23, 2),
  new TeethSet(24, 2),
  new TeethSet(25, 2),
  new TeethSet(26, 2),
  new TeethSet(27, 2),
  new TeethSet(28, 2),
];

const initialTeethState3 = [
  new TeethSet(48, 3),
  new TeethSet(47, 3),
  new TeethSet(46, 3),
  new TeethSet(45, 3),
  new TeethSet(44, 3),
  new TeethSet(43, 3),
  new TeethSet(42, 3),
  new TeethSet(41, 3),
  new TeethSet(31, 3),
  new TeethSet(32, 3),
  new TeethSet(33, 3),
  new TeethSet(34, 3),
  new TeethSet(35, 3),
  new TeethSet(36, 3),
  new TeethSet(37, 3),
  new TeethSet(38, 3),
];

const initialTeethState4 = [
  new TeethSet(85, 4),
  new TeethSet(84, 4),
  new TeethSet(83, 4),
  new TeethSet(82, 4),
  new TeethSet(81, 4),
  new TeethSet(71, 4),
  new TeethSet(72, 4),
  new TeethSet(73, 4),
  new TeethSet(74, 4),
  new TeethSet(75, 4),
];

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MODAL_ON:
      state.showModal = true;
      return;
    case SET_MODAL_OFF:
      state.showModal = false;
      return;
    case MODAL_VALUE:
      state.modalTeeth = action.payload;
      return;
    case CHANGE_TOP:
      state.modalTeeth.topTeeth = action.payload;
      console.log("top =", state.modalTeeth.topTeeth);
      return;
    case CHANGE_BOT:
      state.modalTeeth.bottomTeeth = action.payload;
      console.log("bot =", state.modalTeeth.bottomTeeth);
      return;
    case CHANGE_LEFT:
      state.modalTeeth.leftTeeth = action.payload;
      return;
    case CHANGE_RIGHT:
      state.modalTeeth.rightTeeth = action.payload;
      return;
    case CHANGE_MID:
      state.modalTeeth.middleTeeth = action.payload;
      return;
    case EMPTY_VALUE:
      state.modalTeeth = 0;
      return;
    default:
      throw new Error("unexpected action type" + action.type);
  }
};

function TeethImage() {
  const [state, dispatch] = useReducer(produce(reducer), {
    showModal: false,
    modalTeeth: {},
    topTeeth: "",
  });

  function onClick(th) {
    dispatch({ type: MODAL_VALUE, payload: th });
    dispatch({ type: SET_MODAL_ON });
  }

  const handleClose = () => {
    dispatch({ type: SET_MODAL_OFF });
    dispatch({ type: EMPTY_VALUE });
  };

  const teethLayout = (teethGroup, width, small) => {
    return (
      <div
        className={
          small
            ? "flex items-center mb-10"
            : "flex mx-auto items-center mb-10 ml-[10%]"
        }
        style={{ width }}
      >
        {map(teethGroup, (teeth, index) => (
          <Fragment key={`qwe-${index}`}>
            <div>
              <div className={small ? "ml-16 " : "ml-20"}>
                {teeth.teethNumber}
              </div>
              <div className={small ? "pb-12" : "pb-14"}>
                <TeethObject
                  topTeeth={teeth.topTeeth}
                  bottomTeeth={teeth.bottomTeeth}
                  leftTeeth={teeth.leftTeeth}
                  rightTeeth={teeth.rightTeeth}
                  middleTeeth={teeth.middleTeeth}
                  small={small}
                  onClick={() => onClick(teeth)}
                />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Box className={"bg-white w-[12%] h-[35%] absolute"}>
        <p className="text-center"> Legend</p>
      </Box>

      <div className="pl-[16%]">
        {teethLayout(initialTeethState1, "65%", false)}
        {teethLayout(initialTeethState2, "200%", true)}
        {teethLayout(initialTeethState3, "200%", true)}
        {teethLayout(initialTeethState4, "65%", false)}

        <TeethModal
          show={state.showModal}
          handleClose={handleClose}
          teeth={state.modalTeeth}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

export default TeethImage;
