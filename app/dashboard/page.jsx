export default function Dashboard() {
  return (
    <div className="relative h-[100vh]">
      <h1>Dashboard</h1>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex gap-6">
        <button className="h-[70px] w-[140px] border border-emerald-500 text-emerald-500 rounded-xl font-medium tracking-wide uppercase transition-all hover:bg-emerald-500 hover:text-black focus:outline focus:outline-2 focus:outline-emerald-400">
          <span>Static QR</span>
        </button>
        <button className="h-[70px] w-[140px] border border-emerald-500 text-emerald-500 rounded-xl font-medium tracking-wide uppercase transition-all hover:bg-emerald-500 hover:text-black focus:outline focus:outline-2 focus:outline-emerald-400">
          <span>Dynamic QR</span>
        </button>
      </div>
    </div>
  );
}
