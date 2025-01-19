import React from "react";

const Connected = (props) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          You are connected to MetaMask!
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-semibold text-gray-800">Connected Account:</span> {props.account}
        </p>
        <p className="text-lg text-gray-600 mb-6">
          <span className="font-semibold text-gray-800">Remaining Time:</span> {props.remainingTime}
        </p>
        
        {props.show ? (
          <p className="text-center text-green-600 font-semibold mb-6">
            You have already voted!
          </p>
        ) : (
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                placeholder="Enter Candidate Index"
                value={props.number}
                onChange={props.handleNumberChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <button
                onClick={props.vote}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              >
                Vote
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Index</th>
                <th className="border border-gray-300 px-4 py-2">Candidate Name</th>
                <th className="border border-gray-300 px-4 py-2">Candidate Votes</th>
              </tr>
            </thead>
            <tbody>
              {props.candidates.map((candidate, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} text-center`}
                >
                  <td className="border border-gray-300 px-4 py-2">{candidate.index}</td>
                  <td className="border border-gray-300 px-4 py-2">{candidate.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{candidate.voteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Connected;
