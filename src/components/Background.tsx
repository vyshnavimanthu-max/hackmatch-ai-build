export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[var(--color-purple)] opacity-20 blur-[120px]" />
      <div className="absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[var(--color-teal)] opacity-[0.16] blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-[var(--color-purple)] opacity-[0.12] blur-[140px]" />
    </div>
  )
}
