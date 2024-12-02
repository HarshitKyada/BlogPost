import React from "react";
import ReadMoreButton from "./ReadMoreButton";

const HomeCard = ({ data }) => {
  return (
    <div>
      <div className="max-w-sm rounded-lg shadow bg-gray-800 border-gray-700">
        <img
          className="rounded-t-lg h-72 w-full object-center object-fill"
          src={`data:image/jpeg;base64,${data?.featuredImageBinary}`}
          alt=""
        />

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {data?.title}
          </h5>

          <p className="mb-3 font-normal text-gray-400">
            {data?.contentBlocks[0].content}
          </p>
          <ReadMoreButton data={data}/>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
