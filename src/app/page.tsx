import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SocialLinks from "@/components/socialLinks";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="flex justify-center flex-col h-screen">
        <div className="flex max-sm:flex-col justify-between">
          <div className="flex items-start justify-center flex-col gap-8">

            <div className="flex items-start flex-col">
              <span className="mt-2 font-semibold tracking-tight text-4xl md:text-[2.7rem] leading-tight md:leading-tight">
                Hey there, I’m
              </span>
              <div className="flex">
                <h1 className="text-5xl font-extrabold highlight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Yuvrajsinh Gohil
                </h1>
                <span className="text-4xl animate-wiggle">👋🏽</span>
              </div>
            </div>

            <div>
              <p className="text-xl md:text-[17px] text-gray-400 tracking-tight leading-relaxed">
                Passionate about efficiency, tech, and open source
              </p>
            </div>

            <div className="flex gap-5">
              <SocialLinks />
              {/* <Link href="/Resume"
                className="m-auto w-44 h-10 flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 text-sm  rounded-full font-medium">
                Download Resume
              </Link>

              <Link href="/contact"
                className="m-auto w-44 p-3 text-center bg-gray-800/20 text-sm rounded-full font-medium ring-1 ring-inset ring-gray-700/30 backdrop-blur-md">
                Let's Connect
              </Link> */}
            </div>
          </div>
          <div className="h-96 w-80 bg-red-500 rounded-2xl"></div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
