import React from 'react';
import RateLimiterTester from './RateLimiterTester';
import { useState, useEffect } from 'react';
import Popup from './Popup';

const App = () => {

  return (
    <div className="h-screen overflow-auto bg-gray-100 font-roboto text-gray-700 p-8 flex" data-step="1" data-intro="This is the left bar.">
      <Popup />
      {/* Left Sidebar */}
      <aside className="w-1/4 bg-white shadow-md rounded-lg p-6 flex flex-col space-y-6">
        <div className="flex items-center border p-2 rounded-md">
          <span className="material-icons text-gray-400 mr-2"></span>
          <input className="text-base flex-grow outline-none" type="text" placeholder="Search..." />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Your Cards</h2>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel dolor sed elit finibus ornare.</p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Send Money To</h2>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet dolor ac dolor.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 ml-4 bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <ul className="flex space-x-6 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
            <li className="hover:text-blue-600 cursor-pointer">Payments</li>
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
            <li className="hover:text-blue-600 cursor-pointer">Currency</li>
            <li className="hover:text-blue-600 cursor-pointer">Settings</li>
          </ul>
        </div>
        <RateLimiterTester />
      </main>
    </div>
  );
};

export default App;
