import React from "react";

export default function Hero() {
    return (
        <section className="w-full p-15 max-w-5xl mx-auto bg-gray-600 py-5 flex flex-col mt-5 mb-5">
            <div className="flex items-center gap-4">
                <img src="soo_hwangbo.png" className="w-30 rounded-2xl" alt="Soo Hwangbo" />
                <div>
                    <div className="text-6xl md:text-3xl text-white text-left ">
                        Soo's Blog
                    </div>
                    <div className="text-lg md:text-md text-gray-300 max-w-2xl text-left">
                        Thoughts, code, and creativity.
                    </div>
                </div>
            </div>
        </section >
    );
}
