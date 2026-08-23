// Temporary mock data matching the recursive Comment shape (see docs/COMPONENT_CONTRACTS.md).
// Import directly in PostDetail.jsx while the real comment-fetching thunk is being built.
// depth 0 = top-level, +1 per nested reply level. replies[] can be empty.

export const mockComments = [
  {
    id: 't1_c001',
    author: 'euphoric_reader',
    bodyMarkdown: 'Just makes me want to move on instantly... at times I do that (or when autofill misses or mixes up half of it anyways)',
    ups: 71,
    createdAt: '2h ago',
    depth: 0,
    replies: [
      {
        id: 't1_c002',
        author: 'environment_weak',
        bodyMarkdown: 'My autofill will be like *Salary expectations*: Bachelors of Science',
        ups: 36,
        createdAt: '2h ago',
        depth: 1,
        replies: [
          {
            id: 't1_c003',
            author: 'fine_donuts',
            bodyMarkdown: 'I would expect my salary to pay off student loans for my bachelor\u2019s of science.',
            ups: 5,
            createdAt: '1h ago',
            depth: 2,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 't1_c004',
    author: 'fabulousmaybe',
    bodyMarkdown: 'Same for me.',
    ups: 8,
    createdAt: '2h ago',
    depth: 0,
    replies: []
  },
  {
    id: 't1_c005',
    author: 'runs_okay',
    bodyMarkdown: "It's always Workday too.",
    ups: 7,
    createdAt: '2h ago',
    depth: 0,
    replies: [
      {
        id: 't1_c006',
        author: 'patient_detail',
        bodyMarkdown: 'Workday is the devil.',
        ups: 5,
        createdAt: '1h ago',
        depth: 1,
        replies: []
      }
    ]
  },
  {
    id: 't1_c007',
    author: 'lecture_organic',
    bodyMarkdown: "Same, if it asks me to upload my resume and that's it, I'm good with that. But if I upload and then asks for everything again manually, that's when I close the tab.",
    ups: 12,
    createdAt: '19h ago',
    depth: 0,
    replies: []
  }
];
