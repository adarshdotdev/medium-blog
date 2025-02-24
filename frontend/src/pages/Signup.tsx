import React, { useState } from "react";
import { SignupType } from "@adarshdotdev/medium-common";
import Quote from "../components/Quote";
import InputWithLabel from "../components/InputWithLabel";
import Auth from "../components/Auth";
const Signup = () => {
  return (
    <div>
      <Auth type="signup" />

      <Quote />
    </div>
  );
};
export default Signup;
