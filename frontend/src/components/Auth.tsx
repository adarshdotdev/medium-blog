import { Link } from "react-router-dom";
import Quote from "./Quote";
import { ReactNode, useState } from "react";
import InputWithLabel from "./InputWithLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { parseAst } from "vite";

const Auth = ({ type }: { type: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signup = async () => {
    console.log(formData);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        formData
      );
      console.log(response);
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log("Auth ", e);
    }
  };

  const signin = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email: formData.email,
        password: formData.password,
      });

      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = () => {
    if (type == "signup") {
      signup();
    } else {
      signin();
    }
  };
  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 h-screen     ">
      <div className="w-[360px] place-self-center mt-25 lg:mt-0">
        <div className=" mb-4">
          <h3 className="font-extrabold text-[32px]">
            {type === "signup" ? "Create an account" : "Access your account"}
          </h3>
          <p className="text-sm  ">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <Link
              className="underline text-blue-600"
              to={type === "signup" ? "/signin" : "/signup"}
            >
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
        {type == "signup" && (
          <InputWithLabel
            label="Name"
            placeholder="abc"
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
          />
        )}
        <InputWithLabel
          label="Email"
          placeholder="adc@gmail.com"
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value,
            });
          }}
        />
        <InputWithLabel
          label="Password"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value,
            });
          }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-full dark:focus:ring-blue-800"
        >
          {type == "signup" ? "Sign up" : "Sign In"}
        </button>
      </div>
      <div className="invisible lg:visible ">
        <Quote />
      </div>
    </div>
  );
};

export default Auth;
