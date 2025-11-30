"use client";
import React, { ChangeEvent, SetStateAction } from "react";
import Image from "next/image";
import { useState } from "react";
import { TrippleSpiner } from "@/app/_components/Loading";
import clsx from "clsx";

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
    const feildsError = computeErrors()
    setError(feildsError)
    return !error.name && !error.email && !error.type && !error.message;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return
      try {
        setIsSubmitting(true);
        const url = "https://rise-frontend-test-api.developer-a6a.workers.dev/";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            type,
          }),
        });
        if (!response.ok) {
          throw new Error("error posting message");
        }

        setName("");
        setEmail("");
        setMessage("");
        setType("");
        setSuccess(true);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
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
          <div className="fixed top-3 left-1/2 w-[646px] z-20 -translate-x-1/2 h-[613px] bg-gray-50 rounded-2xl overflow-hidden">
            {isSubmitting && <TrippleSpiner />}
            <header
              className={"bg-white h-[113px] px-6 py-8  border border-gray-200"}
            >
              <h4 className="text-2xl font-semibold text-black">
                What would you like to bring to our attention?
              </h4>
              <p className="text-[#555B64] text-sm">
                Kindly fill the details below to submit.
              </p>
            </header>
            <div className="px-6 py-8 h-full text-black text-sm flex flex-col gap-4 overflow-y-auto">
              <div className="">
                <div
                  className={clsx(
                    "h-14 rounded-2xl flex items-center bg-white py-2 px-4 border  relative",
                    error.name ? "border-red-500" : "border-gray-200"
                  )}
                >
                  {name && (
                    <p className="absolute -top-2 backdrop-blur left-8 text-xs text-[#747881]">
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
                    className="h-full w-full outline-none"
                  />
                </div>
                {error.name && (
                  <p className="text-red-500 text-xs mt-1">{error.name}</p>
                )}
              </div>
              <div className="relative">
                {email && (
                  <p className="absolute -top-2 backdrop-blur left-8 text-xs text-[#747881]  ">
                    Email
                  </p>
                )}
                <div
                  className={clsx(
                    "h-14 rounded-2xl flex items-center  bg-white py-2 px-4 border ",
                    error.email ? "border-red-500" : "border-gray-200"
                  )}
                >
                  <div className="mr-2 border-r pr-2 border-gray-200">
                    <Image
                      src={"/icons/mail-line.svg"}
                      alt="email"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.trim();
                      setEmail(value);
                      const errorMsg = validateField("email", value);
                      setError((prev) => ({ ...prev, email: errorMsg }));
                    }}
                    className="h-full w-full outline-none text-sm"
                  />
                </div>
                {error.email && (
                  <p className="text-red-500 text-xs mt-1">{error.email}</p>
                )}
              </div>
              <div className="">
                <div className="h-14 rounded-2xl flex items-center  bg-white py-2 px-4 border border-gray-200 relative">
                  {
                    <p className="absolute -top-2 backdrop-blur left-8 text-xs text-[#747881]  ">
                      Feedback type
                    </p>
                  }
                  <select
                    className="w-full outline-none "
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
                    "min-h-22 rounded-2xl  bg-white py-2 px-3 border border-gray-200 relative",
                    error.message ? "border-red-500" : "border-gray-200"
                  )}
                >
                  {message && (
                    <p className="absolute -top-2 backdrop-blur left-8 text-xs text-[#747881] ">
                      Message
                    </p>
                  )}
                  <textarea
                    placeholder="Enter feedback message..."
                    className="h-full w-full outline-none"
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
            <footer
              className={
                " absolute bottom-0 w-full bg-white h-[108px] px-6 py-8  border border-gray-200 flex gap-4"
              }
            >
              <button
                type="button"
                onClick={() => setOpenFilterForm(false)}
                className="bg-gray-100 text-[#006D79] inline-block w-1/2 rounded-4xl font-semibold h-[52px]"
              >
                close
              </button>
              <button
                type="submit"
                className={clsx(
                  "inline-block w-1/2  text-white rounded-4xl font-semibold h-[52px]",
                 Object.values(error).every(err =>  !err) ? "bg-[#9FDCE1]":"bg-gray-200"
                )}
              >
                Submit{" "}
              </button>
            </footer>
          </div>
        </form>
      )}
      {success && (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 w-[646px] z-20 -translate-x-1/2 h-[317px] bg-gray-50 rounded-2xl overflow-hidden">
          <div className="px-6 py-12 h-[calc(100%-108px)] text-black text-sm flex flex-col gap-1 items-center justify-center ">
            <Image
              src={"/icons/emotion-happy-fill.svg"}
              alt="happy"
              width={40}
              height={40}
            />
            <h3 className="font-semibold text-black text-2xl h-full flex flex-col items-center justify-center">
              Thank you for your feedback
            </h3>
            <p className="text-gray-600 text-sm">
              We have received your feedback! Our team will attend to it.
            </p>
          </div>
          <footer
            className={
              " absolute bottom-0 w-full bg-white h-[108px] px-6 py-8  border border-gray-200 flex item-center justify-center gap-4"
            }
          >
            <button
              type="button"
              onClick={() => setOpenFilterForm(false)}
              className={
                "bg-gray-100 text-[#006D79] inline-block w-1/2 rounded-4xl font-semibold h-[52px]"
              }
            >
              close
            </button>
          </footer>
        </div>
      )}
    </>
  );
}

const feedbackTypes = ["bug", "feature request", "other"];
