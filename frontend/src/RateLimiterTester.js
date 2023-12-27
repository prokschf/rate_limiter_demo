import React, { useState, useEffect } from 'react';

const RateLimiterTester = () => {
    const [requests, setRequests] = useState(0);
    const [selectedNumber, setSelectedNumber] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [rateLimit, setRateLimit] = useState(0);
    const [newRateLimit, setNewRateLimit] = useState(0);
    const [rateLimitReached, setRateLimitReached] = useState(false);

    useEffect(() => {
        async function fetchRateLimit() {
            const response = await fetch("http://localhost:5000/rate");
            const data = await response.json();
            setRateLimit(data.max_requests_per_minute);
        }


        fetchRateLimit();
    }, []);

    const updateRateLimit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/rate?value=${newRateLimit}`, {
                method: 'POST',
            });
            if (response.ok) {
                setRateLimit(newRateLimit);
                setShowModal(false);
            } else {
                console.error("Failed to update rate limit");
            }
        } catch (error) {
            console.error('Failed to update rate limit:', error);
        }
    };

    const sendRequest = async () => {
        try {
            const response = await fetch('http://localhost:5000/echo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'Testing rate limiter' }),
            });

            if (response.status === 429) {
                setRateLimitReached(true);
            } else {
                setRequests((prevRequests) => prevRequests + 1);
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const testRateLimiter = async (numRequests) => {
        for (let i = 0; i < numRequests; i++) {
            await sendRequest();
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 100);
    }, []);

    const percentage = Math.min((requests / 40) * 100, 100);
    const sliderPercentage = (selectedNumber / 40) * 100;

    return (
        <div className={`flex flex-col items-center justify-center h-[95%] overflow-auto space-y-16 bg-gray-100 transition-all duration-300 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Modal */}

            <div className="absolute top-4 right-4">
                <button onClick={() => setShowModal(true)}>
                    <div className="group inline-block">
                        <div className="p-2 shadow-md bg-white rounded-full hover:bg-gray-100 flex items-center space-x-2  transition-all duration-300 w-8 group-hover:w-28 overflow-hidden ">
                            <i className="fas fa-cog text-gray-600"></i>
                            <span className="text-gray-600">Settings</span>
                        </div>
                    </div>



                </button>
            </div>


            {showModal && (
                <div
                    className={`fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md 
                                ${showModal ? 'opacity-100' : 'opacity-0'} transition-all duration-2000`}
                    onClick={() => setShowModal(false)}
                >
                    <div className="fixed inset-0 flex items-center justify-center z-50 transition-transform transform scale-95 opacity-0 animate-modal-entrance">
                        <div className="bg-white p-4 rounded shadow-lg relative  w-3/4 justify-center"
                            onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-xl font-semibold mb-4">Rate Limit Settings</h2>
                            {/* Current Rate Limit */}
                            <p className="text-gray-400 mb-4 pl-2 italic">
                                Adjust the rate limit settings for your application. Ensure you choose a reasonable value based on your server capacity and user expectations.
                            </p>
                            <div className="mb-4">
                                <label className="inline-block p-2  text-gray-700 font-medium">Current Rate Limit:</label>
                                <span className="inline-block p-2 text-gray-700 bg-gray-200 rounded mt-1 pt-1 pb-1">
                                    {rateLimit}
                                </span>
                                <label className="inline-block p-2  text-gray-700 font-medium">requests/minute</label>

                            </div>
                            <div className=''>
                                <input
                                    type="number"
                                    value={newRateLimit}
                                    onChange={(e) => setNewRateLimit(e.target.value)}
                                    className="mt-4 border rounded p-2"
                                />
                            </div>
                            <button onClick={updateRateLimit} className="w-1/2 mt-4  px-12 py-2 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-in-out transform hover:scale-102">
                                Update Rate Limit
                            </button>
                            <button
                                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                                onClick={() => setShowModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>


                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="text-center space-y-4 pb-4">
                <h2 className="text-5xl font-semibold mb-2 text-blue-700">Rate Limiter Tester</h2>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
                <p className="text-gray-600">Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse non nisl sit amet velit hendrerit rutrum.</p>
            </div>

            {/* Rate Limiter Indicator (Output) */}
            <div className="w-3/4 p-4 bg-white rounded-lg shadow-lg space-y-4">
                <div className="relative h-6 bg-gray-200 rounded-md overflow-hidden">
                    <div style={{ width: `${percentage}%` }} className={`absolute left-0 top-0 h-6 transition-all duration-500 ease-in-out ${percentage === 100 ? 'bg-red-600' : 'bg-blue-600'}`}></div>
                </div>
                <p className="text-center text-gray-700">
                    {rateLimitReached ? `Rate Limit Reached at ${requests}` : `${requests} Requests Sent`}
                </p>
            </div>

            {/* Controls (Input) */}
            <div className="w-2/4 bg-white p-4 rounded-lg shadow-lg group" >
                <div className="relative mb-4  ">
                    <input
                        id="requests"
                        type="range"
                        min="1"
                        max="40"
                        value={selectedNumber}
                        onChange={(e) => setSelectedNumber(Number(e.target.value))}
                        className="slider w-full cursor-pointer slider-thumb appearance-none h-2 rounded-md bg-gray-300"
                    />
                    <span className="absolute top-0 transform -translate-x-[25%] scale-90 group-hover:scale-150 group-hover:-translate-y-12 transition-all duration-300 ease-in-out " style={{ left: `calc(${sliderPercentage}% - 15px)` }}>
                        <div className="bg-white px-3 py-1 rounded-lg shadow-md text-gray-600">
                            {selectedNumber}
                        </div>
                    </span>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => testRateLimiter(selectedNumber)}
                        className="w-1/2 mt-4 px-12 py-2 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-in-out transform hover:scale-102"
                    >
                        Test Rate Limiter
                    </button>
                </div>
            </div>
        </div >
    );
};

export default RateLimiterTester;
