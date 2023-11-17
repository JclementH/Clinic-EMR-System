import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputName = classNames(
    "flex items-center mx-auto my-auto w-[480px] h-[80px] bg-[#eaeaea] rounded-[6px]"
  );
  const inputTextBox = classNames("bg-[#eaeaea] w-full h-[50%]");
  const iconStyle = classNames("text-4xl w-[100px]");
  const submitContainerGray = classNames(
    "flex justify-center items-center w-[220px] h-[59px] rounded-[50px] text-xl font-bold cursor-pointer text-white bg-[#8eccff]"
  );
  const { navigate } = useNavigation();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleNavigate = (to) => {
    navigate(to);
  };

  return (
    <div className="absolute z-[10] bg-white w-full h-full">
      <div className="flex flex-col m-auto mt-[200px] w-[600px] pb-[30px]">
        <div className="flex justify-center gap-[9px] w-full mt-[30px]">
          <div className="text-[#8eccff] text-6xl font-bold">Login</div>
          <div className="w-[200px] h-[6px] bg-[#8eccff] mt-[75px] rounded-lg absolute" />
        </div>
        <div className="mt-[55px] flex flex-col gap-[25px]">
         
          <div className={inputName}>
            <AiOutlineMail className={iconStyle} />
            <input
              type="email"
              className={inputTextBox}
              placeholder="Email"
              onChange={changeEmail}
              value={email}
            />
          </div>
          <div className={inputName}>
            <AiOutlineLock className={iconStyle} />
            <input
              type="password"
              className={inputTextBox}
              placeholder="Password"
              onChange={changePassword}
              value={password}
            />
          </div>

          <div>
              <div className="pl-[62px] mt-[27px] text-[#797979] text-l">
                Forgot Password?
                <span className="text-blue-300 hover:cursor-pointer ml-[5px]">
                  Click Here
                </span>
              </div>
              <div className="pl-[62px] w-[120px] text-[#797979] text-l hover:cursor-pointer hover:text-[#8eccff]">
                <p
                  onClick={() => handleNavigate("/signup")}
                >
                  Sign Up
                </p>
              </div>
            </div>
        </div>

        <div className="flex gap-[30px] m-auto mt-[60px]">
          <div className={submitContainerGray} onClick={() => handleNavigate("/clinic")}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};
