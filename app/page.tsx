import Header from './Header'
import Home from './Home'

export default function Pigza() {
  return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <Home />
      </div>
  );
}