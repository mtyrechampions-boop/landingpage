'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Navigation } from 'lucide-react';

const CORRIDORS = [
  {
    id: 'camberley-yateley',
    title: 'Camberley & Yateley',
    body: 'Flat tyre near the A30, Blackwater Valley or M3 Junction 4? Get mobile tyre assistance at your home, workplace or a safe roadside location without travelling to a garage.',
    coverage: 'Camberley, Yateley, Blackwater and surrounding roads.',
  },
  {
    id: 'farnborough-aldershot',
    title: 'Farnborough & Aldershot',
    body: 'Close to our Aldershot operating hub, we cover the A331 and A31 corridors, providing roadside assistance and convenient mobile fitting for local homes and businesses.',
    coverage: 'Farnborough, Aldershot, North Camp and nearby areas.',
  },
  {
    id: 'guildford-surrey',
    title: 'Guildford & Surrey Hills',
    body: "Whether you're travelling along the A3, commuting into Guildford or parked outside your workplace, our mobile fitters can come to you for tyre replacements and repairs.",
    coverage: 'Guildford town centre, A3, A31 and surrounding communities.',
  },
  {
    id: 'portsmouth-southampton',
    title: 'Portsmouth & Southampton',
    body: 'Need mobile tyre fitting on the South Coast? Contact our team for availability across Portsmouth, Southampton, the M27 corridor and nearby residential and commercial areas.',
    coverage: 'Portsmouth, Southampton, M27 and surrounding port routes.',
  },
];

/* Transit-style schematic rather than a literal projection: every route radiates from
   the Aldershot hub, and the compass relationships are kept true (Yateley and
   Blackwater north-west, Camberley north-east, Guildford east, coast to the south). */
const HUB = { x: 300, y: 310 };

const NODES = [
  { name: 'Yateley', x: 120, y: 110, corridor: 'camberley-yateley', label: 'top' },
  { name: 'Blackwater', x: 230, y: 110, corridor: 'camberley-yateley', label: 'top', minor: true },
  { name: 'Camberley', x: 370, y: 110, corridor: 'camberley-yateley', label: 'top' },
  { name: 'Farnborough', x: 300, y: 180, corridor: 'farnborough-aldershot', label: 'right' },
  { name: 'North Camp', x: 300, y: 245, corridor: 'farnborough-aldershot', label: 'right', minor: true },
  { name: 'Aldershot', x: HUB.x, y: HUB.y, corridor: 'farnborough-aldershot', label: 'left', hub: true },
  { name: 'Farnham', x: 430, y: 310, corridor: 'guildford-surrey', label: 'top', minor: true },
  { name: 'Guildford', x: 565, y: 310, corridor: 'guildford-surrey', label: 'right' },
  { name: 'Southampton', x: 155, y: 455, corridor: 'portsmouth-southampton', label: 'bottom' },
  { name: 'Portsmouth', x: 445, y: 455, corridor: 'portsmouth-southampton', label: 'bottom' },
];

const LINES = [
  { corridor: 'farnborough-aldershot', d: 'M 300,310 L 300,180' },
  { corridor: 'camberley-yateley', d: 'M 300,180 L 230,110 L 120,110' },
  { corridor: 'camberley-yateley', d: 'M 300,180 L 370,110' },
  { corridor: 'guildford-surrey', d: 'M 300,310 L 565,310' },
  { corridor: 'portsmouth-southampton', d: 'M 300,310 L 155,455' },
  { corridor: 'portsmouth-southampton', d: 'M 300,310 L 445,455' },
  { corridor: 'portsmouth-southampton', d: 'M 155,455 L 445,455' },
];

// Road shields sit beside their route, never on top of it, so nothing overlaps a stop.
const SHIELDS = [
  { id: 'A30', x: 175, y: 140, corridor: 'camberley-yateley' },
  { id: 'M3 J4', x: 370, y: 150, corridor: 'camberley-yateley' },
  { id: 'A331', x: 350, y: 215, corridor: 'farnborough-aldershot' },
  { id: 'A31', x: 365, y: 282, corridor: 'guildford-surrey' },
  { id: 'M3', x: 186, y: 368, corridor: 'portsmouth-southampton' },
  { id: 'A3', x: 414, y: 368, corridor: 'portsmouth-southampton' },
  { id: 'M27', x: 300, y: 428, corridor: 'portsmouth-southampton' },
];

const LABEL_OFFSET = {
  top: { dx: 0, dy: -20, anchor: 'middle' },
  right: { dx: 20, dy: 6, anchor: 'start' },
  // Lifted slightly so the hub's two-line label clears the route heading south-west.
  left: { dx: -24, dy: -8, anchor: 'end' },
  bottom: { dx: 0, dy: 32, anchor: 'middle' },
};

const LandingCorridors = () => {
  const [active, setActive] = useState(null);

  const state = (corridor) => {
    if (!active) return 'rest';
    return active === corridor ? 'live' : 'dim';
  };

  return (
    <section
      id="corridors"
      className="scroll-mt-20 lg:scroll-mt-24 bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <Navigation size={14} />
            <span>Aldershot-Based Mobile Tyre Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Local Tyre Fitters Covering Surrey, Hampshire & the South Coast
          </h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
            From the Blackwater Valley to the South Coast, our mobile tyre fitting service supports drivers across major commuter routes, residential areas and business locations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Corridor map */}
          <div className="lg:sticky lg:top-28">
            <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-[#0B1528] border border-white/10 shadow-2xl p-4 sm:p-6">
              <svg
                viewBox="0 0 720 560"
                className="w-full h-auto"
                role="img"
                aria-label="Route diagram of the mobile tyre fitting corridors radiating from the Aldershot hub to Yateley, Blackwater, Camberley, Farnborough, Farnham, Guildford, Southampton and Portsmouth."
              >
                <defs>
                  <filter id="corridor-line-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Dispatch range rings */}
                {[130, 205, 268].map((r) => (
                  <circle
                    key={r}
                    cx={HUB.x}
                    cy={HUB.y}
                    r={r}
                    fill="none"
                    stroke="rgba(148,163,184,0.14)"
                    strokeWidth="1"
                    strokeDasharray="3 9"
                  />
                ))}

                {/* Routes */}
                {LINES.map((line) => {
                  const s = state(line.corridor);
                  return (
                    <path
                      key={line.d + line.corridor}
                      d={line.d}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                      stroke={s === 'dim' ? '#1E293B' : '#FB7E10'}
                      strokeOpacity={s === 'live' ? 1 : s === 'rest' ? 0.55 : 1}
                      strokeWidth={s === 'live' ? 10 : 7}
                      filter={s === 'live' ? 'url(#corridor-line-glow)' : undefined}
                    />
                  );
                })}

                {/* Road shields */}
                {SHIELDS.map((shield) => {
                  const s = state(shield.corridor);
                  const width = shield.id.length * 9 + 18;
                  return (
                    <g key={shield.id} className="transition-opacity duration-300" opacity={s === 'dim' ? 0.25 : 1}>
                      <rect
                        x={shield.x - width / 2}
                        y={shield.y - 12}
                        width={width}
                        height="24"
                        rx="7"
                        fill="#0B1528"
                        stroke={s === 'live' ? '#FB7E10' : 'rgba(148,163,184,0.35)'}
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                      <text
                        x={shield.x}
                        y={shield.y + 5}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="800"
                        fill={s === 'live' ? '#FB7E10' : '#94A3B8'}
                        className="transition-all duration-300"
                      >
                        {shield.id}
                      </text>
                    </g>
                  );
                })}

                {/* Stops */}
                {NODES.map((node) => {
                  const s = state(node.corridor);
                  const offset = LABEL_OFFSET[node.label];
                  const dimmed = s === 'dim';
                  return (
                    <g key={node.name} className="transition-opacity duration-300" opacity={dimmed ? 0.3 : 1}>
                      {node.hub && !dimmed && (
                        <circle cx={node.x} cy={node.y} r="16" fill="none" stroke="#FB7E10" strokeWidth="2">
                          <animate attributeName="r" values="16;30;16" dur="3.2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.7;0;0.7" dur="3.2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.hub ? 15 : node.minor ? 7 : 10}
                        fill={node.hub ? '#FB7E10' : '#0B1528'}
                        stroke={dimmed ? '#334155' : node.hub ? '#FFFFFF' : '#FB7E10'}
                        strokeWidth={node.hub ? 4 : 4}
                        className="transition-all duration-300"
                      />
                      <text
                        x={node.x + offset.dx}
                        y={node.y + offset.dy}
                        textAnchor={offset.anchor}
                        fontSize={node.hub ? 21 : node.minor ? 16 : 18}
                        fontWeight={node.hub ? 900 : 700}
                        fill={dimmed ? '#475569' : node.hub || !node.minor ? '#FFFFFF' : '#CBD5E1'}
                        className="transition-all duration-300"
                      >
                        {node.name}
                      </text>
                      {node.hub && (
                        <text
                          x={node.x + offset.dx}
                          y={node.y + offset.dy + 19}
                          textAnchor={offset.anchor}
                          fontSize="12"
                          fontWeight="800"
                          letterSpacing="2"
                          fill="#FB7E10"
                          className="transition-all duration-300"
                        >
                          OPERATING HUB
                        </text>
                      )}
                    </g>
                  );
                })}

                <text
                  x={HUB.x}
                  y="520"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="800"
                  letterSpacing="4"
                  fill="#475569"
                >
                  SOUTH COAST
                </text>
              </svg>

              <p className="mt-1 text-center text-[11px] font-semibold text-slate-500">
                Indicative route diagram — hover a corridor to trace its routes.
              </p>
            </div>
          </div>

          {/* Corridor cards */}
          <div className="space-y-5">
            {CORRIDORS.map((corridor) => {
              const isActive = active === corridor.id;
              return (
                <article
                  key={corridor.id}
                  onMouseEnter={() => setActive(corridor.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(corridor.id)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  className={`rounded-3xl p-6 sm:p-7 border-2 transition-all duration-300 outline-none ${isActive
                      ? 'bg-white border-[#FB7E10]/50 shadow-xl shadow-orange-500/10 -translate-y-0.5'
                      : 'bg-gray-50 border-gray-200 hover:border-[#FB7E10]/30'
                    } focus-visible:ring-2 focus-visible:ring-[#FB7E10] focus-visible:ring-offset-2`}
                >
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                    <MapPin size={20} className="text-[#FB7E10] shrink-0" />
                    {corridor.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
                    {corridor.body}
                  </p>

                  <p className="mt-4 pt-3 border-t border-gray-200 text-xs sm:text-sm font-bold text-gray-700">
                    <span className="text-[#FB7E10] uppercase tracking-wider">Coverage: </span>
                    {corridor.coverage}
                  </p>
                </article>
              );
            })}

            <a
              href="tel:02071013856"
              data-conversion="phone-call"
              className="flex items-center justify-center gap-2 bg-[#FB7E10] hover:bg-orange-600 text-white px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <Phone size={16} className="fill-current shrink-0" />
              <span>Check Cover For Your Road</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingCorridors;
