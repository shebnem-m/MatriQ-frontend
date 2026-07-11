import Image from "next/image";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredItems, setFeaturedItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchListings({ limit: 6 });
      setFeaturedItems(data);
    };
    loadData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/listings?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.js file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>

        {/* Soft Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            width="100%" 
            height="220" 
            viewBox="0 0 1440 220" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path 
              d="M0 220L60 190C120 160 240 120 360 115C480 110 600 145 720 160C840 175 960 165 1080 140C1200 115 1320 65 1380 45L1440 25V220H0Z" 
              fill="#ffffff" 
              fillOpacity="0.95"
            />
            <path 
              d="M0 220L70 195C140 170 280 140 410 135C540 130 660 155 780 165C900 175 1020 160 1140 130C1260 100 1350 55 1410 35L1440 25V220H0Z" 
              fill="#ffffff" 
              fillOpacity="0.85"
            />
          </svg>
        </div>
      </div>

      {/* Featured Materials Section */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Featured Materials</h2>
            <a href="/listings" className="text-[#a0522d] hover:underline font-medium flex items-center gap-2">
              View all materials →
            </a>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
