import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col  p-10  bg-gray-900 max-w-5xl mx-auto">
            <div className="pb-4 mb-8 p-5 bg-gray-800 border border-gray-500">
                <h2 className="text-2xl/9 font-bold tracking-tight text-light">
                    About Soo
                </h2>
                <p className="text-lg font-light mt-5">
                    I am a full stack web developer and I make cool websites and apps. 
                </p>
            </div>
        </div >
    );
}
