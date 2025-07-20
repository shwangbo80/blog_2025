import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col  p-10  bg-gray-900 max-w-4xl mx-auto">
            <div className="pb-4 mb-8 p-5 bg-gray-800 border border-gray-500">
                <h2 className="text-2xl/9 font-bold tracking-tight text-light">
                    About Soo
                </h2>
                <p className="text-lg mt-5">
                    Hello! I'm Soo, a passionate software developer with a love for creating innovative solutions. Welcome to my blog, where I share my thoughts on technology, programming, and life.
                </p>
            </div>
        </div >
    );
}
