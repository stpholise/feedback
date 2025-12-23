"use client";
import React, { useMemo, useState, useCallback } from "react";
import clsx from "clsx";
import Image from "next/image";
import FeedbackForm from "./FeedbackForm";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const params = useSearchParams();
  const defaultFilter = params.get("type") || "";
  const searchUrl = params.get("search") || "";
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>(defaultFilter);
  const [openFilterForm, setOpenFilterForm] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(searchUrl);

  const debounce = <T extends (...args: never[]) => void>(
    fn: T,
    delay: number
  ) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return (...arg: Parameters<T>) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => fn(...arg), delay);
    };
  };
  const updateSearchUrl = useCallback(
    (value: string) => {
      router.replace(`/feedback?search=${value}`);
    },
    [router]
  );
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        updateSearchUrl(value);
      }, 600),
    [updateSearchUrl]
  );
  const updateFilter = (filter: string) => {
    setSelectedFilter(filter);
    setDisplayFilter(false);
    router.replace(`/feedback?type=${filter}`, { scroll: false });
  };

  const [displayFilter, setDisplayFilter] = useState(false);

  return (
    <div className="flex mt-2 sm:mt-0 flex-col-reverse sm:flex-col  lg:flex xl:flex-row xl:items-center  justify-between w-full  py-2">
      <div className="flex  relative ">
        
        <div
          className={clsx(
            "static     bg-[#efefef] transform  duration-500 ease-in-out  py-4 w-full xs:w-fit px-4 sm:px-0 flex flex-row gap-3 overflow-x-scroll xs:overflow-x-auto",
            
               "flex translate-y-0 opacity-100 h-fit   "
               
          )}
        >
           
          {filterOptions.map((item, index) => (
            <button
              onClick={() => updateFilter(item.value)}
              key={index}
              className={clsx(
                "font-medium px-3 py-1 text-sm rounded-md border  cursor-pointer h-8 min-w-fit",
                selectedFilter == item.value
                  ? "bg-[#EDFFFF]  border-[#9FDCE1] text-[#006D79] rounded-md "
                  : "bg-[#F9FAFB] text-black border-[#EAECF0]"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        {displayFilter && (
          <div className="overlay z-10  bg-[rgba(0,0,0,0.2)] backdrop-blur-xs fixed w-full top-0 bottom-0 right-0 left-0 md:hidden"></div>
        )}
      </div>
      <div className="flex flex-col xs:flex-row lg:flex-row justify-between w-full  xl:w-1/2 gap-4">
        <div className=" w-full xs:w-1/2  sm:w-66 rounded-3xl h-9 sm:h-11 bg-white flex items-center px-3 py-1 text-black text-sm gap-2">
          <Image
            src={"/icons/search.svg"}
            alt="search"
            width={16}
            height={16}
          />
          <input
            type="text"
            value={search}
            className="outline-none h-full py-1"
            placeholder="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setSearch(value);
              debouncedSearch(value);
            }}
          />
        </div>
        <button
          onClick={() => setOpenFilterForm((prev) => !prev)}
          className="rounded-4xl flex items-center justify-center gap-2 bg-[#006D79] py-2 px-4 sm:h-11 w-full   h-9 sm:w-fit cursor-pointer"
        >
          <Image
            src={"/icons/add.png"}
            alt="plus sign"
            width={16}
            height={16}
          />{" "}
          <span className="">Submit new feedback</span>
        </button>
      </div>
      {openFilterForm && (
        <div className="fixed top-0 right-0 left-0 bottom-0">
          <FeedbackForm setOpenFilterForm={setOpenFilterForm} />

          <div
            role="button"
            onClick={() => setOpenFilterForm(false)}
            className="fixed z-10 top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-xs cursor-pointer "
          ></div>
        </div>
      )}
    </div>
  );
};
const filterOptions: { value: string; label: string }[] = [
  { value: "", label: "All Feedbacks " },
  { value: "bug", label: "Only bugs " },
  { value: "feature", label: "Only feature requests " },
  { value: "other", label: "Only other" },
];
export default Filter;
