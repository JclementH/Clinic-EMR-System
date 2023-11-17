import { Button } from "@mui/material";
import { AiOutlineHome, AiOutlineCalendar, AiOutlineProfile} from "react-icons/ai";
import Link from "./Link";

const ICON_SIZE = "mr-1 text-2xl text-white";

function MobileFooter() {
  return (
    <div className="bg-blue-500 py-3 text-center fixed bottom-0 w-full">
      <div className="flex justify-between mx-[70px]">
        <Link activeClassName="text-blue-500" to="/patient">
          <AiOutlineHome className={ICON_SIZE} fontSize={30} />
        </Link>
        <Link activeClassName="text-blue-500" to="/patient/calendar">
          <AiOutlineCalendar className={ICON_SIZE} fontSize={30} />
        </Link>
        <Link activeClassName="text-blue-500" to="/patient/history">
          <AiOutlineProfile className={ICON_SIZE} fontSize={30} />
        </Link>
      </div>
    </div>
  );
}

export default MobileFooter;
