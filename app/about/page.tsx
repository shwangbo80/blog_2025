import Link from "next/link";
import Image from "next/image";
export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col  p-10  bg-gray-900 max-w-5xl mx-auto">
            <div className="pb-4 mb-8 p-5 bg-gray-800 border border-gray-500">
                <div className="">
                    <h2 className="text-2xl/9 font-bold tracking-tight text-light md:w-1/2">
                        About Soo
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 mt-5 items-start">
                        <div className="md:w-3/4 w-full flex md:justify-start">
                            <Image src="/soo_laptop.jpg" alt="Soo working on laptop" width={300} height={200} className="rounded-lg object-cover w-full" />
                        </div>
                        <div className="w-full">
                            <p className="text-lg font-light">
                                I am a long time artist & graphic designer who selftaught himself how to code, and turned himself into a full stack web developer.  I believe a good web developer is a hybrid mix of artist who has keen eye of good design, and and discipline architect who can create scalable and maintainable code. While practcing daily to improve my carft, you can see me at local Starbucks with my laptop, sipping on a coffee, and working on my next project. This blog is a collection of my thoughts, ideas, and projects that I have worked on. I hope you find it useful and inspiring.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
