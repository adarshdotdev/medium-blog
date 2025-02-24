import React, { useState } from "react";
import Quote from "../components/Quote";
import { SigninType } from "@adarshdotdev/medium-common";
import InputWithLabel from "../components/InputWithLabel";
import Auth from "../components/Auth";

const Signin = () => {
  return (
    <div>
      <Auth type="signin" />

      <Quote />
    </div>
  );
};

export default Signin;
