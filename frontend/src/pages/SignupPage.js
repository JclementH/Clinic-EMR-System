import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";
import { Box, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [prcid, setPrcid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputName = classNames(
    "flex items-center mx-auto my-auto w-[480px] h-[80px] bg-[#eaeaea] rounded-[6px]"
  );
  const inputTextBox = classNames("bg-[#eaeaea] w-full h-[50%] ml-[20px]");
  const iconStyle = classNames("text-4xl w-[100px]");
  const submitContainerGray = classNames(
    "flex justify-center items-center w-[220px] h-[59px] rounded-[50px] text-xl font-bold cursor-pointer text-white bg-[#8eccff]"
  );
  const { navigate } = useNavigation();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const changeMiddleName = (event) => {
    setMiddleName(event.target.value);
  };
  const changeLastName = (event) => {
    setLastName(event.target.value);
  };
  const changePrcid = (event) => {
    setPrcid(event.target.value.replace(/[^0-9]/g, ""));
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
          <div className="text-[#8eccff] text-6xl font-bold">Sign Up</div>
          <div className="w-[200px] h-[6px] bg-[#8eccff] mt-[75px] rounded-lg absolute" />
        </div>
        <div className="mt-[55px] flex flex-col gap-[25px]">
          <Box className={"shadow-lg h-full"}>
            <div className="flex flex-col gap-[25px] m-[50px]">
              <div className={inputName}>
                <input
                  type="firstname"
                  className={inputTextBox}
                  placeholder="First Name"
                  onChange={changeFirstName}
                  value={firstName}
                />
              </div>
              <div className={inputName}>
                <input
                  type="middlename"
                  className={inputTextBox}
                  placeholder="Middle Name"
                  onChange={changeMiddleName}
                  value={middleName}
                />
              </div>
              <div className={inputName}>
                <input
                  type="lastname"
                  className={inputTextBox}
                  placeholder="Last Name"
                  onChange={changeLastName}
                  value={lastName}
                />
              </div>
              <div className={inputName}>
                <input
                  type="email"
                  className={inputTextBox}
                  placeholder="Email"
                  onChange={changeEmail}
                  value={email}
                />
              </div>
              <div className={inputName}>
                <input
                  type="password"
                  className={inputTextBox}
                  placeholder="Password"
                  onChange={changePassword}
                  value={password}
                />
              </div>
              <div className={inputName}>
                <input
                  type="prcid"
                  className={inputTextBox}
                  placeholder="PRC ID"
                  onChange={changePrcid}
                  value={prcid}
                />
              </div>

              <div className="flex flex-cols-2 gap-10 justify-between">
                <div>
                  <Button>Upload PRC ID</Button>
                </div>
                <div>
                  <FormGroup>
                    <FormControlLabel
                      required
                      control={<Checkbox />}
                      label="Doctor"
                    />
                    <FormControlLabel
                      required
                      control={<Checkbox />}
                      label="Assistant"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          </Box>
          <p
            className="text-[#797979] w-[100px] text-l hover:cursor-pointer hover:text-[#8eccff]"
            onClick={() => handleNavigate("/")}
          >
            Login Instead
          </p>
        </div>

        <div className="flex gap-[30px] m-auto mt-[60px]">
          <div
            className={submitContainerGray}
            onClick={() => handleNavigate("/clinic")}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};
