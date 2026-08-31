'use client';

import React from 'react';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';

const reviews = [
  {
    name: 'James P.',
    location: 'Farnham, Surrey',
    arrivalTime: '35 min arrival',
    stars: 5,
    text: 'Had a blowout on the A31 at 11pm. Called Mobile Tyre Champions and they had a technician with me in 35 minutes. Fitted and balanced a brand new tyre roadside. Absolute lifesaver.',
    verified: true,
    date: '2 weeks ago'
  },
  {
    name: 'Sarah L.',
    location: 'Camberley, Surrey',
    arrivalTime: '40 min arrival',
    stars: 5,
    text: 'Woke up to a flat tyre before work. Called at 7am and the fitter was at my driveway by 7:40. New tyre fitted and I still made it to the office on time. Incredible service.',
    verified: true,
    date: '1 week ago'
  },
  {
    name: 'Michael T.',
    location: 'Basingstoke, Hampshire',
    arrivalTime: '45 min arrival',
    stars: 5,
    text: 'Lost my locking wheel nut key before an MOT. These guys came out with the right extraction tools and had all four nuts off without damaging my alloys. Highly recommend.',
    verified: true,
    date: '3 days ago'
  },
  {
    name: 'Rachel K.',
    location: 'Woking, Surrey',
    arrivalTime: '30 min arrival',
    stars: 5,
    text: 'Puncture on the school run with two kids in the car. The technician was so professional and quick. Had us back on the road in 20 minutes. Will definitely use again.',
    verified: true,
    date: '5 days ago'
  },
  {
    name: 'David H.',
    location: 'Fleet, Hampshire',
    arrivalTime: '38 min arrival',
    stars: 5,
    text: 'Our delivery van got a flat at the depot. Called these guys and they fitted a commercial tyre on-site with a proper VAT receipt. Saved us a full day of downtime.',
    verified: true,
    date: '1 month ago'
  },
  {
    name: 'Emma W.',
    location: 'Guildford, Surrey',
    arrivalTime: '42 min arrival',
    stars: 5,
    text: 'Hit a pothole and got a nasty sidewall bulge. Didn\'t feel safe driving to a garage. Mobile Tyre Champions came to my office car park and fitted a new tyre during my lunch break.',
    verified: true,
    date: '2 weeks ago'
  }
];

const LandingReviews = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FB7E10]/10 border border-[#FB7E10]/20 text-[#FB7E10] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            <Star size={14} className="fill-current" />
            <span>Verified Driver Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            REAL DRIVERS. REAL RESULTS.
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            Hundreds of verified 5-star Google reviews from drivers we've helped across Surrey, Hampshire & Berkshire.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 font-normal">
                  "{r.text}"
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-black text-gray-900 text-sm block">{r.name}</span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                      <MapPin size={11} />
                      <span>{r.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#FB7E10]">
                      <Clock size={11} />
                      <span>{r.arrivalTime}</span>
                    </div>
                    {r.verified && (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold mt-0.5">
                        <CheckCircle size={10} />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LandingReviews;
