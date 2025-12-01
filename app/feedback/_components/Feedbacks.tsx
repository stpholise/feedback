
import Pagination from "./Pagination";

interface FeedbackType {
  name: string;
  email: string;
  phone: string;
  message: string;
  type?: string;
}

const Feedbacks = async ({
  type,
  search = "",
}: {
  type?: string;
  search?: string;
}) => {
  const params = new URLSearchParams({
    type: type || "",
  });

  const url = `https://rise-frontend-test-api.developer-a6a.workers.dev/?${params.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    console.log("error fetching product");
  }

  

  const data = (await res.json()) as FeedbackType[];
 
console.log("data")
  const filterValues = () => {
    return data
      .filter((item) => (type ? item.type == type : true))
      .filter((item) =>
        search ? item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.message.toLowerCase().includes(search.toLowerCase()): true
      );
  };
 ;

  return (
    <div>
      {<Pagination items={filterValues()} />}
      {/* {filterdData.map((feedback, index) => (
        <div key={index} className="border border-gray-200 rounded-lg px-4 py-4 text-[#555B64] bg-white text-sm">
          <div className="flex items-center gap-2 mb-4  ">
            <div className=" size-8 flex items-center justify-center  p-1  text-center rounded-full bg-gray-100 uppercase text-black  text-sm">
              {feedback.name
                .split(" ")
                .map((word: string) => word[0])
                .join("")}
            </div>
            <p className="text-black  font-medium text-base capitalize  h-fit  ">
              {feedback.name}
            </p>
          </div>
          <div className="flex items-start mt-2 w-full">
            <Image
              src={"/icons/email.svg"}
              alt="email icon"
              width={16}
              height={16}
              className="mr-2"
            />
            <p className="break-all">{feedback.email}</p>
          </div>
          <div className="flex items-center mt-2">
            <Image
              src={"/icons/phone.svg"}
              alt="email icon"
              width={16}
              height={16}
              className="mr-2"
            />
            <p className="text-black"></p>02230193845
          </div>
          <div className="flex items-start mt-2">
            <Image
              src={"/icons/bugs.svg"}
              alt="email icon"
              width={16}
              height={16}
              className="mr-2 "
            />
            <div className="">
              <p className="text-black  font-mediom text-sm">Bugs</p>
              <p className="">{feedback.message}</p>
            </div>
          </div>
            <div className="">{feedback.type}</div>
        </div>
      ))} */}
    </div>
  );
};

export default Feedbacks;
