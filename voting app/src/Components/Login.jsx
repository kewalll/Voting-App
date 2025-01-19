import React from 'react';

const Login = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to the Decentralized Voting Application!
        </h1>
        <button
          onClick={props.connectWallet}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
        >
          Login with MetaMask
        </button>
      </div>
    </div>
  );
};

export default Login;
