import React from "react";

const Finished = (props) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Voting has ended!
        </h1>
        <p className="text-gray-600 text-lg">
          Thank you for participating in the voting process.
        </p>
      </div>
    </div>
  );
};

export default Finished;
