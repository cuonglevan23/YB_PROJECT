import { memo, useState } from "react";
import { TimeHeatmap } from "../components/ui/charts";

interface TopVideo {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar?: string;
  views: number;
  subscribers: number;
  duration: string;
  publishedDate: string;
  vph: number;
}

interface TopChannel {
  id: string;
  name: string;
  avatar?: string;
  subscribers: number;
  newSubs: number;
  verified?: boolean;
}

// Mock data based on the image
const MOCK_TOP_VIDEOS: TopVideo[] = [
  {
    id: "1",
    title: "FULL DAY OF EATING & TRAINING 'intense but fun'",
    thumbnail: "/api/placeholder/200/120",
    channel: "GAINSBYBRAINS",
    subscribers: 400000,
    views: 42000,
    duration: "16:54",
    publishedDate: "2 days ago",
    vph: 1000,
  },
  {
    id: "2",
    title: "🔥Brutal HIIT Cardio Workout // Quick Workout Finisher",
    thumbnail: "/api/placeholder/200/120",
    channel: "Heather Robertson",
    subscribers: 1700000,
    views: 18000,
    duration: "8:45",
    publishedDate: "a day ago",
    vph: 1000,
  },
  {
    id: "3",
    title:
      "DIAMOND Chest, Triceps and Abs Workout - Upper Body | EPIC III Day 25",
    thumbnail: "/api/placeholder/200/120",
    channel: "Caroline Girvan",
    subscribers: 1300000,
    views: 60000,
    duration: "12:30",
    publishedDate: "3 days ago",
    vph: 991,
  },
  {
    id: "4",
    title: "FULL BODY 35 MIN BARRE & PILATES WORKOUT || Full Body Sculpt",
    thumbnail: "/api/placeholder/200/120",
    channel: "Move With Nicole",
    subscribers: 531000,
    views: 25000,
    duration: "35:12",
    publishedDate: "2 days ago",
    vph: 710,
  },
  {
    id: "5",
    title:
      "30 Min Yoga Workout For Results | Deep Stretch Yoga & Full Body Workout",
    thumbnail: "/api/placeholder/200/120",
    channel: "Boho Beautiful",
    subscribers: 2200000,
    views: 73000,
    duration: "30:15",
    publishedDate: "5 days ago",
    vph: 535,
  },
  {
    id: "6",
    title: "LOW IMPACT HIIT Workout (With Weights)",
    thumbnail: "/api/placeholder/200/120",
    channel: "Heather Robertson",
    subscribers: 1700000,
    views: 111000,
    duration: "25:40",
    publishedDate: "5 days ago",
    vph: 509,
  },
];

const MOCK_TOP_CHANNELS: TopChannel[] = [
  {
    id: "1",
    name: "Homebody Pilates",
    avatar: "/api/placeholder/40/40",
    subscribers: 2600000,
    newSubs: 12,
    verified: false,
  },
  {
    id: "2",
    name: "Nell Hoses",
    avatar: "/api/placeholder/40/40",
    subscribers: 19000,
    newSubs: 10,
    verified: false,
  },
  {
    id: "3",
    name: "John Garey TV",
    avatar: "/api/placeholder/40/40",
    subscribers: 81000,
    newSubs: 9,
    verified: true,
  },
  {
    id: "4",
    name: "Jess P Fit",
    avatar: "/api/placeholder/40/40",
    subscribers: 4000,
    newSubs: 8,
    verified: false,
  },
  {
    id: "5",
    name: "Heather Robertson",
    avatar: "/api/placeholder/40/40",
    subscribers: 1700000,
    newSubs: 8,
    verified: false,
  },
  {
    id: "6",
    name: "Lottie Murphy",
    avatar: "/api/placeholder/40/40",
    subscribers: 250000,
    newSubs: 8,
    verified: true,
  },
  {
    id: "7",
    name: "Move With Nicole",
    avatar: "/api/placeholder/40/40",
    subscribers: 531000,
    newSubs: 7,
    verified: true,
  },
  {
    id: "8",
    name: "Pilates Body with Michelle & Alexis",
    avatar: "/api/placeholder/40/40",
    subscribers: 2400000,
    newSubs: 7,
    verified: false,
  },
  {
    id: "9",
    name: "Function Pilates",
    avatar: "/api/placeholder/40/40",
    subscribers: 2700000,
    newSubs: 7,
    verified: false,
  },
  {
    id: "10",
    name: "Dez Fit",
    avatar: "/api/placeholder/40/40",
    subscribers: 11000,
    newSubs: 6,
    verified: false,
  },
];

const SubscribersPage = memo(function SubscribersPage() {
  const [selectedDay, setSelectedDay] = useState("Thursday");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const navigateDay = (direction: "prev" | "next") => {
    const currentIndex = days.indexOf(selectedDay);
    if (direction === "prev") {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : days.length - 1;
      setSelectedDay(days[prevIndex]);
    } else {
      const nextIndex = currentIndex < days.length - 1 ? currentIndex + 1 : 0;
      setSelectedDay(days[nextIndex]);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatViews = (views: number): string => {
    return `${formatNumber(views)} views`;
  };

  const formatSubscribers = (subs: number): string => {
    return `${formatNumber(subs)} subs`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Subscribers</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Top Videos */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-2">
                Top videos watched by your subscribers
              </h2>
              <p className="text-sm text-blue-400">
                See which videos your audience is watching and create similar
                content on your channel
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {MOCK_TOP_VIDEOS.map((video) => (
                  <div
                    key={video.id}
                    className="flex gap-4 group cursor-pointer hover:bg-gray-700/50 p-3 rounded-lg transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-32 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iODAiIGZpbGw9IiM0QjVTNjMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Q0EzQUYiIGZvbnQtc2l6ZT0iMTIiPlRodW1ibmFpbDwvdGV4dD48L3N2Zz4=";
                        }}
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm line-clamp-2 mb-1 group-hover:text-blue-400">
                        {video.title}
                      </h3>
                      <div className="text-gray-400 text-xs mb-2">
                        {video.channel} • {formatSubscribers(video.subscribers)}{" "}
                        • {video.publishedDate}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{formatViews(video.views)}</span>
                        <span>{video.vph} VPH</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 text-blue-400 hover:text-blue-300 text-sm font-medium">
                Show more
              </button>
            </div>
          </div>

          {/* Middle Column - Top Channels */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-2">
                Top channels your subscribers are subscribing to
              </h2>
              <p className="text-sm text-blue-400">
                Discover channels your audience is watching and add them as
                competitors
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {MOCK_TOP_CHANNELS.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between group cursor-pointer hover:bg-gray-700/50 p-3 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={channel.avatar}
                          alt={channel.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNEI1NTYzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjEyIj5BPC90ZXh0Pjwvc3ZnPg==";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white text-sm group-hover:text-blue-400">
                            {channel.name}
                          </h3>
                          {channel.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {formatSubscribers(channel.subscribers)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-medium">
                        +{channel.newSubs}
                      </span>
                      <span className="text-gray-500 text-xs">subs</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 text-blue-400 hover:text-blue-300 text-sm font-medium">
                Show more
              </button>
            </div>
          </div>

          {/* Right Column - Best Times to Post */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-2">
                Best times to post
              </h2>
              <p className="text-sm text-red-400">
                Current best times to post on Thursday are 6am - 9am
              </p>
            </div>
            <div className="p-6">
              {/* Day Selector */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateDay("prev")}
                  className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                >
                  <span className="text-xl">‹</span>
                </button>
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">
                    {selectedDay}
                  </div>
                  <div className="text-sm text-gray-400">
                    Timezone: (GMT+8:00) Pacific Time
                  </div>
                </div>
                <button
                  onClick={() => navigateDay("next")}
                  className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                >
                  <span className="text-xl">›</span>
                </button>
              </div>

              {/* Time Chart and Heatmap */}
              <TimeHeatmap selectedDay={selectedDay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SubscribersPage;
