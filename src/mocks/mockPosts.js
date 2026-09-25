// Mock data in Reddit's raw listing shape: { data: { children: [{ data: {...} }] } }.
// This is what postsSlice's fulfilled reducer expects fetchPosts to return, so normalizePost
// runs over it exactly as it will over the real API response. Swapping to live data later
// only changes where fetchPosts gets its data from — the slice and everything downstream stay put.
//
// created_utc is a Unix timestamp in seconds, computed relative to page load so formatTimeAgo()
// keeps showing the same "Xh ago" values instead of drifting as the real clock moves on.

const now = Math.floor(Date.now() / 1000);
const hoursAgo = (hours) => now - hours * 3600;

export const mockPosts = {
  data: {
    children: [
      {
        data: {
          id: 't3_1abc23',
          title: "Reddit's JSON API just got a lot friendlier for side projects",
          author: 'devwatcher',
          subreddit: 'technology',
          created_utc: hoursAgo(3),
          ups: 3100,
          num_comments: 245,
          thumbnail: '/mock/thumb.svg',
          permalink: '/r/technology/comments/1abc23/reddits_json_api_just_got_a_lot_friendlier/'
        }
      },
      {
        data: {
          id: 't3_1def45',
          title: "Finally beat the boss I've been stuck on for two weeks",
          author: 'grindking',
          subreddit: 'gaming',
          created_utc: hoursAgo(8),
          ups: 892,
          num_comments: 178,
          thumbnail: '/mock/thumb.svg',
          permalink: '/r/gaming/comments/1def45/finally_beat_the_boss_ive_been_stuck_on/'
        }
      },
      {
        data: {
          id: 't3_1ghi67',
          title: 'How many extension leads is too many extension leads?',
          author: 'access_self_storage',
          subreddit: 'aww',
          created_utc: hoursAgo(96),
          ups: 102,
          num_comments: 72,
          thumbnail: '/mock/thumb.svg',
          permalink: '/r/aww/comments/1ghi67/how_many_extension_leads_is_too_many/'
        }
      },
      {
        data: {
          id: 't3_1jkl89',
          title: 'Director confirms sequel is officially in development',
          author: 'newsreel',
          subreddit: 'movies',
          created_utc: hoursAgo(2),
          ups: 6100,
          num_comments: 900,
          thumbnail: '/mock/thumb.svg',
          permalink: '/r/movies/comments/1jkl89/director_confirms_sequel_is_officially_in/'
        }
      },
      {
        data: {
          id: 't3_1mno12',
          title: "What's a small thing that instantly improved your life?",
          author: 'askerofthings',
          subreddit: 'popular',
          created_utc: hoursAgo(5),
          ups: 2200,
          num_comments: 1500,
          thumbnail: null,
          permalink: '/r/popular/comments/1mno12/whats_a_small_thing_that_instantly_improved/'
        }
      },
      {
        data: {
          id: 't3_1pqr34',
          title: 'New browser feature blocks trackers by default',
          author: 'privacynerd',
          subreddit: 'technology',
          created_utc: hoursAgo(2),
          ups: 1800,
          num_comments: 310,
          thumbnail: '/mock/thumb.svg',
          permalink: '/r/technology/comments/1pqr34/new_browser_feature_blocks_trackers_by_default/'
        }
      }
    ]
  }
};