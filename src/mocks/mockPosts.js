// Temporary mock data matching the normalized PostCard shape (see docs/COMPONENT_CONTRACTS.md).
// Import this directly in Home.jsx / Search.jsx while the real Redux slice is being built.
// Once postsSlice.js exists, swap the import for a useSelector call — nothing else needs to change,
// since PostCard only ever sees objects shaped like these.

export const mockPosts = [
  {
    id: 't3_1abc23',
    title: "Reddit's JSON API just got a lot friendlier for side projects",
    author: 'devwatcher',
    subreddit: 'technology',
    createdAt: '3h ago',
    ups: 3100,
    numComments: 245,
    thumbnail: 'https://via.placeholder.com/140x100',
    permalink: '/r/technology/comments/1abc23/reddits_json_api_just_got_a_lot_friendlier/'
  },
  {
    id: 't3_1def45',
    title: "Finally beat the boss I've been stuck on for two weeks",
    author: 'grindking',
    subreddit: 'gaming',
    createdAt: '8h ago',
    ups: 892,
    numComments: 178,
    thumbnail: 'https://via.placeholder.com/140x100',
    permalink: '/r/gaming/comments/1def45/finally_beat_the_boss_ive_been_stuck_on/'
  },
  {
    id: 't3_1ghi67',
    title: 'How many extension leads is too many extension leads?',
    author: 'access_self_storage',
    subreddit: 'aww',
    createdAt: '4d ago',
    ups: 102,
    numComments: 72,
    thumbnail: 'https://via.placeholder.com/140x100',
    permalink: '/r/aww/comments/1ghi67/how_many_extension_leads_is_too_many/'
  },
  {
    id: 't3_1jkl89',
    title: 'Director confirms sequel is officially in development',
    author: 'newsreel',
    subreddit: 'movies',
    createdAt: '2h ago',
    ups: 6100,
    numComments: 900,
    thumbnail: 'https://via.placeholder.com/140x100',
    permalink: '/r/movies/comments/1jkl89/director_confirms_sequel_is_officially_in/'
  },
  {
    id: 't3_1mno12',
    title: "What's a small thing that instantly improved your life?",
    author: 'askerofthings',
    subreddit: 'popular',
    createdAt: '5h ago',
    ups: 2200,
    numComments: 1500,
    thumbnail: null,
    permalink: '/r/popular/comments/1mno12/whats_a_small_thing_that_instantly_improved/'
  },
  {
    id: 't3_1pqr34',
    title: 'New browser feature blocks trackers by default',
    author: 'privacynerd',
    subreddit: 'technology',
    createdAt: '2h ago',
    ups: 1800,
    numComments: 310,
    thumbnail: 'https://via.placeholder.com/140x100',
    permalink: '/r/technology/comments/1pqr34/new_browser_feature_blocks_trackers_by_default/'
  }
];
