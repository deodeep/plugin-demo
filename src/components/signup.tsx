import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { useAuthEmail } from "njs2-auth-email";
import { SignUpValues, UserInfoValues } from "../types";
import Card from "./card";
import { SIGNUP } from "../constant";
import Container from "./container";
import { SignUpSchema } from "../validation";

const SignUp = () => {
  const { register } = useAuthEmail(
    "https://api4.juegogames.com/NJS-MOBILE-DEMO-00-00-01/"
  );
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  const onFailure = (err: any) => {
    isLoading(false);
    toast.error(err);
  };

  const onSuccess = (res: UserInfoValues) => {
    console.log(res);
    if (res.access_token) {
      localStorage.setItem(
        "registerInfo",
        JSON.stringify({
          token: res.access_token,
          otp: res.otp,
        })
      );
      setTimeout(() => {
        isLoading(false);
        navigate("/verify");
      }, 500);
    } else {
      toast.error("Unable to register. Please try after some time.");
    }
  };
  return (
    <Container>
      <Card title={SIGNUP}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(
            values: SignUpValues,
            { setSubmitting, resetForm }: FormikHelpers<SignUpValues>
          ) => {
            const params = {
              email_id: values.email,
              password: values.password,
              confirm_password: values.confirm_password,
            };
            isLoading(true);
            localStorage.setItem(
              "UserEmail",
              JSON.stringify({ email: values.email })
            );
            register(params, onSuccess, onFailure);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-6" action="#" method="POST">
              <div className="rounded-md shadow-sm">
                <div className="mb-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="false"
                    className="relative block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Username or Email"
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
                <div className="mb-2">
                  <Field
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    autoComplete="false"
                    className="relative block w-full  rounded-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Confirm Password"
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <div className="error">{errors.confirm_password}</div>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  {loading ? "Please wait..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-2 text-center text-sm text-gray-600 font-bold">
          Already User?
          <span
            className="font-medium text-indigo-600 hover:text-indigo-500 mx-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign in
          </span>
        </p>
      </Card>
    </Container>
  );
};

export default SignUp;
