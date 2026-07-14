import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Static display data — visual mock only, not wired to the API       */
/* ------------------------------------------------------------------ */

const STATS = [
  {
    label: "Total Products",
    value: "1,248",
    change: "12.5%",
    icon: Package,
    iconBg: "bg-[#C4682F]",
  },
  {
    label: "Total Orders",
    value: "356",
    change: "8.3%",
    icon: ShoppingCart,
    iconBg: "bg-[#D9772F]",
  },
  {
    label: "Total Users",
    value: "2,134",
    change: "15.7%",
    icon: Users,
    iconBg: "bg-[#8A5A33]",
  },
  {
    label: "Total Revenue",
    value: "$24,860",
    change: "18.6%",
    icon: DollarSign,
    iconBg: "bg-[#6E4226]",
  },
];

const SALES = [
  2600, 3900, 4100, 3800, 3600, 4600, 5000, 4400, 4200, 4700, 4500, 4300,
  5600, 6200, 7000, 8600, 9200, 8200, 7400, 6800, 6300, 6600, 7300, 8100,
  8800, 9400, 8800, 7800, 6600, 6300, 6700,
];

const CATEGORIES = [
  { name: "Cement", pct: 28, color: "#B5502A" },
  { name: "Insulation", pct: 24, color: "#7E3A1D" },
  { name: "Doors & Windows", pct: 20, color: "#D9772F" },
  { name: "Timber", pct: 16, color: "#E7B08A" },
  { name: "Others", pct: 12, color: "#EFE3D3" },
];

const RECENT_ORDERS = [
  { id: "#ORD-1048", product: "Cement - MatriQ Premium", price: "$320.00", status: "Completed" },
  { id: "#ORD-1047", product: "Steel Rebar 12mm", price: "$450.00", status: "Processing" },
  { id: "#ORD-1046", product: "Insulation Board 50mm", price: "$230.00", status: "Completed" },
  { id: "#ORD-1045", product: "Doors Set - Modern", price: "$780.00", status: "Processing" },
  { id: "#ORD-1044", product: "Timber Beam 4x6", price: "$120.00", status: "Completed" },
];

const LOW_STOCK = [
  { name: "Steel Rebar 8mm", stock: 8 },
  { name: "Insulation Board 25mm", stock: 12 },
  { name: "Cement - Premium 50kg", stock: 5 },
  { name: "Brick Clay Red", stock: 15 },
];

const RECENT_MESSAGES = [
  { name: "John Doe", initials: "JD", subject: "Product Inquiry - Cement", time: "2h ago" },
  { name: "Sarah Smith", initials: "SS", subject: "Bulk Order Request", time: "5h ago" },
  { name: "Ali Khan", initials: "AK", subject: "Delivery Information", time: "1d ago" },
];

/* ------------------------------------------------------------------ */
/* Sales chart geometry                                                */
/* ------------------------------------------------------------------ */

const CHART = { w: 660, h: 250, left: 38, right: 12, top: 12, bottom: 28, max: 10000 };
const Y_TICKS = [0, 2000, 4000, 6000, 8000, 10000];
const X_TICKS = [0, 5, 10, 15, 20, 25, 30]; // May 1, 6, 11, 16, 21, 26, 31

function getSalesPoints() {
  const innerW = CHART.w - CHART.left - CHART.right;
  const innerH = CHART.h - CHART.top - CHART.bottom;
  return SALES.map((v, i) => [
    CHART.left + (i / (SALES.length - 1)) * innerW,
    CHART.top + innerH - (v / CHART.max) * innerH,
  ]);
}

function yFor(value) {
  const innerH = CHART.h - CHART.top - CHART.bottom;
  return CHART.top + innerH - (value / CHART.max) * innerH;
}

function formatTick(value) {
  return value === 0 ? "0" : `${value / 1000}K`;
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Card({ className = "", children }) {
  return (
    <div className={`rounded-lg border border-ink/5 bg-chalk shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <h2 className="font-display text-lg font-bold tracking-tight text-ink">{title}</h2>
      {action}
    </div>
  );
}

function ViewAllButton() {
  return (
    <button
      type="button"
      className="rounded-sm bg-rust px-3 py-1.5 text-xs font-medium text-chalk transition-opacity hover:opacity-90"
    >
      View All
    </button>
  );
}

function ProductThumb() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-rust/10 text-rust">
      <Package className="h-5 w-5" />
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, iconBg }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-chalk ${iconBg}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-ink/60">{label}</p>
        <p className="font-display text-2xl font-bold tracking-tight text-ink">{value}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/60">
          <ArrowUpRight className="h-3.5 w-3.5 text-rust" />
          <span className="font-medium text-rust">{change}</span> this month
        </p>
      </div>
    </Card>
  );
}

function SalesOverviewCard() {
  const points = getSalesPoints();
  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const baseY = CHART.h - CHART.bottom;
  const areaPath = `${linePath} L${points[points.length - 1][0].toFixed(1)},${baseY} L${points[0][0].toFixed(1)},${baseY} Z`;

  return (
    <Card className="p-0">
      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="font-display text-lg font-bold tracking-tight text-ink">Sales Overview</h2>
        <select
          defaultValue="month"
          aria-label="Sales period"
          className="rounded-sm border border-ink/15 bg-chalk px-3 py-1.5 text-xs text-ink/80 focus:outline-none"
        >
          <option value="month">This Month</option>
          <option value="week">This Week</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div className="px-3 pb-4 pt-2">
        <svg viewBox={`0 0 ${CHART.w} ${CHART.h}`} className="h-auto w-full" role="img" aria-label="Sales chart for May">
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B5502A" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#B5502A" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* horizontal gridlines + Y labels */}
          {Y_TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={CHART.left}
                x2={CHART.w - CHART.right}
                y1={yFor(tick)}
                y2={yFor(tick)}
                stroke="#1C1B19"
                strokeOpacity="0.07"
                strokeDasharray="3 4"
              />
              <text
                x={CHART.left - 8}
                y={yFor(tick) + 3.5}
                textAnchor="end"
                fontSize="10"
                fill="#1C1B19"
                fillOpacity="0.5"
              >
                {formatTick(tick)}
              </text>
            </g>
          ))}

          {/* X labels */}
          {X_TICKS.map((i) => (
            <text
              key={i}
              x={points[i][0]}
              y={CHART.h - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#1C1B19"
              fillOpacity="0.5"
            >
              May {i + 1}
            </text>
          ))}

          <path d={areaPath} fill="url(#salesFill)" />
          <path d={linePath} fill="none" stroke="#B5502A" strokeWidth="2" strokeLinejoin="round" />
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#B5502A" />
          ))}
        </svg>
      </div>
    </Card>
  );
}

function TopCategoriesCard() {
  const r = 62;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <Card className="p-5">
      <h2 className="font-display text-lg font-bold tracking-tight text-ink">Top Categories</h2>
      <div className="mt-4 flex items-center gap-5">
        <svg viewBox="0 0 200 200" className="h-36 w-36 shrink-0" role="img" aria-label="Category share chart">
          <g transform="rotate(-90 100 100)">
            {CATEGORIES.map(({ name, pct, color }) => {
              const offset = -(acc / 100) * c;
              acc += pct;
              return (
                <circle
                  key={name}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke={color}
                  strokeWidth="34"
                  strokeDasharray={`${(pct / 100) * c} ${c}`}
                  strokeDashoffset={offset}
                />
              );
            })}
          </g>
        </svg>
        <ul className="min-w-0 flex-1 space-y-2.5">
          {CATEGORIES.map(({ name, pct, color }) => (
            <li key={name} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex min-w-0 items-center gap-2 text-ink/70">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span className="truncate">{name}</span>
              </span>
              <span className="font-medium text-ink/80">{pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function LowStockCard() {
  return (
    <Card>
      <CardHeader title="Low Stock Products" action={<ViewAllButton />} />
      <ul className="divide-y divide-ink/5 px-5 pb-2 pt-1">
        {LOW_STOCK.map(({ name, stock }) => (
          <li key={name} className="flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <ProductThumb />
              <span className="truncate text-sm font-medium text-ink">{name}</span>
            </div>
            <span className="shrink-0 rounded-sm border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
              Stock: {stock}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function RecentOrdersCard() {
  return (
    <Card>
      <CardHeader title="Recent Orders" action={<ViewAllButton />} />
      <ul className="divide-y divide-ink/5 px-5 pb-2 pt-1">
        {RECENT_ORDERS.map(({ id, product, price, status }) => (
          <li key={id} className="flex items-center justify-between gap-3 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <ProductThumb />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{id}</p>
                <p className="truncate text-sm text-ink/60">{product}</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-ink">{price}</p>
              <p
                className={`text-xs font-medium ${
                  status === "Completed" ? "text-green-600" : "text-rust"
                }`}
              >
                {status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function RecentMessagesCard() {
  return (
    <Card>
      <CardHeader title="Recent Messages" action={<ViewAllButton />} />
      <ul className="divide-y divide-ink/5 px-5 pb-2 pt-1">
        {RECENT_MESSAGES.map(({ name, initials, subject, time }) => (
          <li key={name} className="flex items-center gap-3 py-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-chalk">
              {initials}
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <p className="shrink-0 text-sm font-semibold text-ink">{name}</p>
              <p className="truncate text-sm text-ink/60">{subject}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-xs text-ink/50">{time}</span>
              <span className="h-2 w-2 rounded-full bg-rust" />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 font-body">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <SalesOverviewCard />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TopCategoriesCard />
            <LowStockCard />
          </div>
        </div>
        <div className="space-y-6 xl:col-span-2">
          <RecentOrdersCard />
          <RecentMessagesCard />
        </div>
      </div>

      <footer className="pb-2 pt-4 text-center text-xs text-ink/50">
        &copy; 2026 MatriQ. All rights reserved.
      </footer>
    </div>
  );
}
