"use client";
import React, { useMemo, useState, useCallback } from "react";
import clsx from "clsx";
import Image from "next/image";
import FeedbackForm from "./FeedbackForm";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const params = useSearchParams();
  const defaultFilter = params.get("type") || "";
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>(defaultFilter);
  const [openFilterForm, setOpenFilterForm] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

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
    <div className="flex lg:flex items-center  justify-between w-full border py-2">
      <div className=" relative">
        <button
          onClick={() => setDisplayFilter((prev) => !prev)}
          className="sm:hidden z-40"
        >
          <Image
            src={"/icons/filter.svg"}
            alt="filter icon"
            width={24}
            height={24}
          />
        </button>
        <div
          className={clsx(
            "fixed sm:static  left-0  right-0 top-0 z-30 bg-[#efefef] transform duration-500 ease-in-out  sm:statictext-black py-12 sm:py-4 w-full sm px-6 sm:px-0 flex flex-col sm:flex-row gap-3",
            displayFilter
              ? "flex translate-y-0 opacity-100 h-fit  w-full sm:w-fit"
              : "-translate-y-full opacity-0 h-0 overflow-hidden sm:opacity-100 w-0 sm:h-fit sm:translate-0"
          )}
        >
          <button
            onClick={() => setDisplayFilter(false)}
            className="absolute top-4 right-4 sm:hidden text-black "
          >
            close
          </button>
          {filterOptions.map((item, index) => (
            <button
              onClick={() => updateFilter(item.value)}
              key={index}
              className={clsx(
                "font-medium px-3 py-1 text-sm rounded-md border border-[#EAECF0] h-8",
                selectedFilter == item.value
                  ? "bg-[#EDFFFF] border-[#9FDCE1] text-[#006D79] rounded-md"
                  : "bg-[#F9FAFB] text-black"
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
      <div className=" w-40 sm:w-60 rounded-2xl h-8 bg-white flex items-center px-3 py-1 text-black text-sm gap-2">
        <Image src={"/icons/search.svg"} alt="search" width={16} height={16} />
        <input
          type="text"
          value={search}
          className="outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearch(value);
            debouncedSearch(value);
          }}
        />
      </div>
      <button
        onClick={() => setOpenFilterForm((prev) => !prev)}
        className="sm:rounded-4xl rounded-sm flex items-center gap-2 bg-[#006D79] py-2 px-4 sm:h-13  h-8  "
      >
        <Image src={"/icons/add.png"} alt="plus sign" width={16} height={16} />{" "}
       <span className="hidden sm:flex">Submit new feedback</span> 
      </button>
      {openFilterForm && (
        <div className="fixed top-0 right-0 left-0 bottom-0">
          <FeedbackForm setOpenFilterForm={setOpenFilterForm} />

          <div
            role="button"
            onClick={() => setOpenFilterForm(false)}
            className="fixed z-10 top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-xs "
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
