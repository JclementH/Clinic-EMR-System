import classNames from "classnames";
import { Button } from "@mui/material";
import Icon from "./main.png";
import useNavigation from "../hooks/use-navigation";
import { SWAP_HOME } from "./Constant";

function Header({ tab, dispatch}) {
  const { navigate } = useNavigation();

  const handleLogo = () => {
    navigate("/clinic")
    dispatch({ type: SWAP_HOME });
  }

  const blueBoxStyle = classNames(
    "bg-blue-500 flex justify-between p-5 text-white font-light pl-10 pr-10"
  );
  const textFormatStyle = classNames("text-4xl");
  const buttonFormatStyle = classNames("bg-white");
  return (
    <div className={blueBoxStyle}>
      <div className="w-[150px]">
        <p className={textFormatStyle}>{tab.currentTab}</p>
      </div>
      <div>
        <img src={Icon} alt="main_logo" className="w-[300px] justify-center flex hover:cursor-pointer" onClick={handleLogo}/>
      </div>
      <div className={buttonFormatStyle}>
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default Header;
