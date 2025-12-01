"use client";
import React, { ChangeEvent, SetStateAction } from "react";
import Image from "next/image";
import { useState } from "react";
import { TrippleSpiner } from "@/app/_components/Loading";
import clsx from "clsx";
import { toast } from "react-toastify";

export default function FeedbackForm({
  setOpenFilterForm,
}: {
  setOpenFilterForm: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [success, setSuccess] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<{
    name?: string;
    email?: string;
    type?: string;
    message?: string;
  }>({});

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Required";
        if (value.length < 3) return "Name must be at least 3 characters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) return "Invalid email format";
        return "";

      case "type":
        if (!value.trim()) return "Please select a feedback type";
        return "";

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.length < 5) return "Message must be at least 5 characters";
        return "";

      default:
        return "";
    }
  };

  const computeErrors = () => ({
    name: validateField("name", name),
    email: validateField("email", email),
    type: validateField("type", type),
    message: validateField("message", message),
  });
  const validateForm = () => {
    const fieldsError = computeErrors();
    setError(fieldsError);
    return Object.values(fieldsError).every((err) => !err);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      const url = "https://rise-frontend-test-api.developer-a6a.workers.dev/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email.trim(),
          message: message,
          type: type,
        }),
      });
      if (!response.ok) {
        const serverMessage = await response.text();
        throw new Error(` Error : ${serverMessage}`);
      }

      setName("");
      setEmail("");
      setMessage("");
      setType("");
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          theme: "light",
          hideProgressBar: true,
        });
        setIsSubmitting(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!success && (
        <form onSubmit={handleSubmit}>
          <div className="fixed flex flex-col top-14 h-[calc(100%-60px)] animate-slideUp xs:animate-none xs:h-auto xs:top-1/2 xs:left-1/2 w-full  md:w-[480px]  xs:max-h-[550px]  z-20 xs:transform-none xs:-translate-1/2  bg-gray-50 sm:rounded-2xl overflow-y-auto overflow-x-hidden">
            {isSubmitting && <TrippleSpiner />}
            <div className={"bg-white h-fit px-6 py-6  border border-gray-200"}>
              <h4 className="sm:text-2xl text-lg font-semibold text-black">
                What would you like to bring to our attention?
              </h4>
              <p className="text-[#555B64] text-sm">
                Kindly fill the details below to submit.
              </p>
            </div>
            <div className="px-6 py-8  text-black text-sm flex flex-col gap-4 overflow-y-auto ">
              <div className="">
                <div
                  className={clsx(
                    "h-12 rounded-xl flex items-center bg-white  border  relative",
                    error.name ? "border-red-500" : "border-gray-200"
                  )}
                >
                  {name && (
                    <p className="absolute -top-2 backdrop-blur left-4 text-xs text-[#747881] bg-white px-1">
                      Full name
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      setName(value);
                      const errorMsg = validateField("name", value);
                      setError((prev) => ({ ...prev, name: errorMsg }));
                    }}
                    className="h-full w-full outline-none py-2 px-4"
                  />
                </div>
                {error.name && (
                  <p className="text-red-500 text-xs mt-1">{error.name}</p>
                )}
              </div>
              <div className="relative">
                {email && (
                  <p className="absolute -top-2 backdrop-blur left-4 text-xs text-[#747881] bg-white px-1">
                    Email
                  </p>
                )}
                <div
                  className={clsx(
                    "h-12 rounded-xl flex items-center px-4  bg-white  border ",
                    error.email ? "border-red-500" : "border-gray-200"
                  )}
                >
                  <label
                    htmlFor="email"
                    className="mr-2 border-r pr-2 border-gray-200"
                  >
                    <Image
                      src={"/icons/mail-line.svg"}
                      alt="email"
                      width={20}
                      height={20}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      setEmail(value);
                      const errorMsg = validateField("email", value);
                      setError((prev) => ({ ...prev, email: errorMsg }));
                    }}
                    className="h-full w-full outline-none text-sm py-2 "
                  />
                </div>
                {error.email && (
                  <p className="text-red-500 text-xs mt-1">{error.email}</p>
                )}
              </div>
              <div className="">
                <div
                  className={clsx(
                    "h-12 rounded-xl flex items-center px-4  bg-white  border relative",
                    error.type ? "border-red-500" : "border-gray-200"
                  )}
                >
                  {type && (
                    <p className="absolute -top-2 backdrop-blur left-4 text-xs text-[#747881] bg-white px-1 ">
                      Feedback type
                    </p>
                  )}
                  <select
                    className="w-full  py-2 h-full outline-none "
                    value={type}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      const value = e.target.value;
                      setType(value);
                      const errorMsg = validateField("type", value);
                      setError((prev) => ({ ...prev, type: errorMsg }));
                    }}
                  >
                    <option value="" className="text-gray-300" disabled>
                      select a feedback type
                    </option>
                    {feedbackTypes.map((type, index) => (
                      <option value={type} key={index} className="capitalize">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {error.type && (
                  <p className="text-red-500 text-xs mt-1">{error.type}</p>
                )}
              </div>
              <div className="">
                <div
                  className={clsx(
                    "  rounded-xl  bg-white border border-gray-200 relative",
                    error.message ? "border-red-500" : "border-gray-200"
                  )}
                >
                  {message && (
                    <p className="absolute -top-2 backdrop-blur left-4 text-xs text-[#747881] bg-white px-1">
                      Message
                    </p>
                  )}
                  <textarea
                    placeholder="Enter feedback message..."
                    className="h-full min-h-18 w-full outline-none  py-2 px-3"
                    value={message}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      const value = e.target.value;
                      setMessage(e.target.value);

                      const errMsg = validateField("message", value);
                      setError((prev) => ({ ...prev, message: errMsg }));
                    }}
                  ></textarea>
                </div>
                {error.message && (
                  <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
              </div>
            </div>
            <div
              className={
                "  w-full bg-white h-[108px] px-6 py-6 mt-auto  border-t border-gray-200 flex items-center gap-4"
              }
            >
              <button
                type="button"
                onClick={() => setOpenFilterForm(false)}
                className="bg-gray-100 text-[#006D79] inline-block w-1/2 rounded-4xl font-semibold h-[52px] cursor-pointer capitalize"
              >
                close
              </button>
              <button
                type="submit"
                className={clsx(
                  "inline-block w-1/2  text-white rounded-4xl font-semibold h-[52px] cursor-pointer",
                  Object.values(error).every((err) => !err)
                    ? "bg-[#006D79]"
                    : "bg-[#9FDCE1]"
                )}
              >
                Submit{" "}
              </button>
            </div>
          </div>
        </form>
      )}
      {success && (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 w-full sm:w-[480px] z-20 -translate-x-1/2 h-[317px]  ">
          <div className=" bg-gray-50 rounded-2xl overflow-hidden">
            <div className="px-6 py-12 h-[calc(100%-108px)] text-black text-sm flex flex-col gap-1 items-center justify-center ">
              <Image
                src={"/icons/emotion-happy-fill.svg"}
                alt="happy"
                width={40}
                height={40}
              />
              <h3 className="font-semibold text-black text-2xl h-full flex flex-col items-center   text-center justify-center">
                Thank you for your feedback
              </h3>
              <p className="text-gray-600 text-sm text-center">
                We have received your feedback! Our team will attend to it.
              </p>
            </div>
            <div
              className={
                "mt-auto w-full bg-white h-[108px] px-6 py-8  border-t border-gray-200 flex item-center justify-center gap-4"
              }
            >
              <button
                type="button"
                onClick={() => setOpenFilterForm(false)}
                className={
                  "bg-gray-100 text-[#006D79] inline-block w-1/2 rounded-4xl font-semibold h-[52px] cursor-pointer capitalize"
                }
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const feedbackTypes = ["bug", "feature", "other"];
