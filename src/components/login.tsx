import { Field, Form, Formik, FormikHelpers } from "formik";
import { useAuthEmail } from "njs2-auth-email";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "./card";
import { FB_APP_ID, LOGIN } from "../constant";

import { SignInValues, UserInfoValues } from "../types";
import Container from "./container";
import { SigninSchema } from "../validation";
import FacebookLogin from "njs2-facebook-login";

const Login = () => {
  // const { initialize } = UseFacebookLoginClient();

  const { login } = useAuthEmail(
    "https://api4.juegogames.com/NJS-MOBILE-DEMO-00-00-01/"
  );
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);

  // useEffect(() => {
  //   initialize({
  //     appId: FB_APP_ID,
  //     version: "v16.0",
  //   });
  // }, []);
  const onFailure = (err: any) => {
    isLoading(false);
    toast.error(err);
  };

  const onSuccess = (res: UserInfoValues) => {
    console.log(res);
    if (res.access_token) {
      localStorage.setItem("UserInfo", JSON.stringify(res));
      localStorage.setItem("token", JSON.stringify(res.access_token));
      setTimeout(() => {
        isLoading(false);
        navigate("/dashboard");
      }, 500);
    } else {
      toast.error("Unable to login. Please try after some time.");
    }
  };

  return (
    <Container>
      <Card title={LOGIN}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SigninSchema}
          onSubmit={(
            values: SignInValues,
            { setSubmitting, resetForm }: FormikHelpers<SignInValues>
          ) => {
            const params = {
              email_id: values.email,
              password: values.password,
            };
            isLoading(true);
            login(params, onSuccess, onFailure);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div className="mb-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="false"
                    className="relative block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email address"
                  />
                  {errors.email && touched.email ? (
                    <div className="error">{errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="false"
                    className="relative block w-full  rounded-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  <NavLink
                    to="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </NavLink>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  {loading ? "Please wait" : "Sign in"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-2 text-center text-sm text-gray-600 font-bold">
          New User?
          <span
            className="font-medium text-indigo-600 hover:text-indigo-500 mx-2 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
        <div className="w-full max-w-md space-y-8">
          <p className="mt-2 text-center text-sm text-gray-600 font-bold">
            Sign in with
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="">
            <FacebookLogin
              appId={FB_APP_ID}
              onFail={() => console.log("Fail")}
              onSuccess={(res: any) => {
                console.log("Success", res);
              }}
              styles={{
                backgroundColor: "",
                color: "",
                fontSize: "",
                padding: "",
                border: "none",
                borderRadius: "",
              }}
              imageWidth={56}
              images={
                "https://w7.pngwing.com/pngs/752/373/png-transparent-computer-icons-facebook-logo-facebook-logo-fine-art-thumbnail.png"
              }
              children={""}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
