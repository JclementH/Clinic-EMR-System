import classNames from "classnames";
import { Button } from "@mui/material";

function Header({path}){

    const headerStyle = classNames('font-bold text-5xl mt-5 mr-5 mb-5');

    switch(path){
        case "/":
            return (
                <div className="flex items-center justify-between w-[120%]"> 
                    <p className={headerStyle}> Home </p>
                    <Button> Login </Button> 
                </div>
            );

        case "/Document":
            return (
                <div className="flex items-center justify-between  w-[120%]"> 
                    <p className={headerStyle}> Document </p>
                    <Button> Login </Button> 
                </div>
            );

        case "/Billing":
            return (
                <div className="flex items-center justify-between  w-[120%]"> 
                    <p className={headerStyle}> Billing </p>
                    <Button> Login </Button> 
                </div>
            );

        case "/Records":
            return (
                <div className="flex items-center justify-between  w-[120%]"> 
                    <p className={headerStyle}> Records </p>
                    <Button> Login </Button> 
                </div>
            );

        default: 
           throw new Error('unexpected action type ' + path);
    }
}

export default Header;