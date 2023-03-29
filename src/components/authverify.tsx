import React, { useEffect, useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useAuthEmail } from "njs2-auth-email";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Card from "./card";
import { VERIFY_EMAIL } from "../constant";

import { UserInfoValues, VerifyValues } from "../types";
import Container from "./container";
import { verifySchema } from "../validation";

const AuthVerify = () => {
  const { verify } = useAuthEmail(
    "https://api4.juegogames.com/NJS-MOBILE-DEMO-00-00-01/"
  );
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const UserEmail = localStorage.getItem("UserEmail");
    const data = UserEmail && JSON.parse(UserEmail);
    if (data) {
      setEmail(data.email);
    }
  }, [email]);

  const onFailure = (err: any) => {
    isLoading(false);
    toast.error(err);
  };

  const onSuccess = (res: UserInfoValues) => {
    console.log(res);
    if (res.access_token) {
      setTimeout(() => {
        isLoading(false);
        navigate("/");
      }, 500);
    } else {
      toast.error("Unable to register. Please try after some time.");
    }
  };

  return (
    <Container>
      <Card title={VERIFY_EMAIL}>
        {email && email.length > 0 && (
          <>
            <p className="text-center text-lg font-bold">
              Please enter the OTP we've sent to
              <br />
              <span className="text-sm">{email}</span>
            </p>
          </>
        )}

        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={verifySchema}
          onSubmit={(
            values: VerifyValues,
            { setSubmitting, resetForm }: FormikHelpers<VerifyValues>
          ) => {
            const params = {
              email_id: email,
              otp: values.otp,
            };
            isLoading(true);
            verify(params, onSuccess, onFailure);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div className="-space-y-px rounded-md shadow-sm">
                <div className="mb-2">
                  <Field
                    id="otp"
                    name="otp"
                    type="otp"
                    autoComplete="false"
                    className="relative block w-full  rounded-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your OTP"
                  />
                  {errors.otp && touched.otp ? (
                    <div className="error">{errors.otp}</div>
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
                  {loading ? "Please wait" : "Verify"}
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
      </Card>
    </Container>
  );
};

export default AuthVerify;
