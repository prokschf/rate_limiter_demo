import { useState, useEffect } from 'react';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';

function Popup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenHovered, setHasBeenHovered] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 8000); // 15 seconds

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if(!hasBeenHovered) {
          const interval = setInterval(() => {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
          }, 12000); // e.g., shake every 5 seconds
      
          return () => clearInterval(interval);
        }
      }, [hasBeenHovered]);
      

    return (
        <>
            <div
                onMouseEnter={() => setHasBeenHovered(true)}
                className={`${isShaking ? 'shake-animation' : ''} fixed z-50 transition-all duration-200 ease-out transform 
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
                   shadow-2xl flex items-center ${hasBeenHovered ? 'w-96' : 'w-24'} 
                 border border-black
                 ${hasBeenHovered ? 'p-2 h-24 rounded-2xl bg-white shadow-lg bottom-12 right-12 ' :
                        'h-24 rounded-full justify-center  bottom-10 right-10 '} 
                `}
            >
                <img src="florian.jpg" alt="Profile" className="h-20 rounded-full" />
                {hasBeenHovered && (
                    <div className={` transition-all ${hasBeenHovered ? 'w-70' : 'w-2'}
                       ml-2 p-4 wrap text-lg absolute top-0 left-20 right-0 bottom-0 transition-all duration-500`}>
                        <div className="group inline-block overflow-hidden">
                            <span className=' overflow-hidden'>Like what you see? Check out my socials!</span>
                                <a href="https://www.linkedin.com/in/florian-proksch-8871b272/" target="_blank" rel="noopener noreferrer">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-0 px-1 rounded -right-2 relative">
                                        <i className="fab fa-linkedin"></i>
                                    </button>
                                </a>

                                <a href="https://www.youtube.com/channel/UCGDN6PLEFy1b0O4y-NuAsCw" target="_blank" rel="noopener noreferrer">
                                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-0 px-1 rounded  -right-4 relative">
                                        <i className="fab fa-youtube"></i>
                                    </button>
                                </a>


                        </div>

                    </div>
                )}
            </div >
        </>
    );





}

export default Popup;
