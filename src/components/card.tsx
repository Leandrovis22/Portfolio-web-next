
export default function Card() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="relative overflow-hidden rounded-3xl bg-[#000D3A]shadow-lg">
        <div className="opacity-[0.15] bg-[url('/Static.png')] repeat bg-[length:64px] z-[4] absolute w-full h-full"></div>
          <div className="relative px-6 py-8">
            <p className="text-blue-300 text-sm mb-2">2024 CV</p>
            <h2 className="text-white text-4xl font-bold mb-4">RESUME</h2>
            
          </div>
        </div>
      </div>
    </div>
  )
}