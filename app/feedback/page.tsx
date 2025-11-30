import Feedbacks from "./_components/Feedbacks";
import Filter from "./_components/Filter";

const page = async({searchParams}: {searchParams: Promise<{ type?: string }>}) => {
  const params = await searchParams;
  const type =  params.type ?? ""
  
  return (
    <div className="lg:px-8">
      {type}
      <div className="">
        <h2 className="font-semibold text-black text-[32px]">
          Got a complain or feedback?
        </h2>
        <div className="flex items-center">
          <div className="px-2 flex items-center ">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`size-5 rounded-full inline-block -ml-1.5 border  border-red-300 bg-gray-200 z-[${index}]`}
              ></span>
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            Our support team is ready to listen and resolve.
          </p>
        </div>
      </div>
      <Filter />
      <Feedbacks type={type}/>
    </div>
  );
};

export default page;
