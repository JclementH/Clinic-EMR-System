import navigationContext from "../context/navigation";
import { useContext } from "react";

function useNavigation(){
    return useContext(navigationContext);
}

export default useNavigation;