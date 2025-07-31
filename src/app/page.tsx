import Link from "next/link";

export default function Home() {


  return (
    <div className={"flex items-center h-screen w-screen mx-auto p-4 container"}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-playfair-display)' }}>Dodo Payments Assigment</h1>

          <p className="text-sm text-gray-700 mt-2 max-w-md text-justify">
            Built my first UI library from scratch using Next.js + Radix UI, took almost 8 hours, learned a ton, didn’t vibe code, and shipped a working, configurable upload component with npm + demo.
          </p>
        </div>
        <div className="flex flex-row gap-4 items-start justify-start mt-4 w-full">
          <Link href="/demo" className="text-blue-800 items-start hover:underline font-semibold" style={{ fontFamily: 'var(--font-playfair-display)' }}>/demo</Link>
          <span className="text-gray-700">|</span>
          <Link href="https://github.com/tsahil01/ui" className="text-blue-800 items-start hover:underline font-semibold" style={{ fontFamily: 'var(--font-playfair-display)' }}>/github</Link>
        </div>
      </div>
    </div>
  );
}
