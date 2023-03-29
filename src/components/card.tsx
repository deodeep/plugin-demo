import React from "react";
import { CardProps } from "../types";

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="mx-auto mb-10 max-w-xl">
      <div className="shadow rounded-xl sm:overflow-hidden sm:rounded-md lg:shadow-xl lg:rounded-lg">
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  {title}
                </h2>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
