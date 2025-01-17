/* 1 */
const { ObjectId, ISODate } = require('./utils');

module.exports = [
  /* 1 */
  {
    _id: ObjectId('5ba289c57223b9429888b9b5'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5c98e1169b093c0c9812b2f2')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'room 1',
    description: 'hello',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73ed1'),
        user: ObjectId('5ba289ba7223b9429888b9b4'),
        role: 'facilitator',
      },
    ],
    creator: ObjectId('5ba289ba7223b9429888b9b4'),
    entryCode: 'rare-shrimp-45',
    dueDate: null,
    image:
      'https://www.tinygraphs.com/spaceinvaders/room 1?theme=berrypie&numcolors=4&size=220&fmt=svg',
    createdAt: ISODate('2018-09-19T17:39:17.490Z'),
    updatedAt: ISODate('2018-09-19T17:39:17.490Z'),
    __v: 0,
  },

  /* 2 */
  {
    _id: ObjectId('5ba289c57223b9429888b9b7'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5d3b493dca44f53a90a9ed35')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'request access',
    description: 'hello',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73ed3'),
        user: ObjectId('5ba289ba7223b9429888b9b4'),
        role: 'facilitator',
      },
    ],
    creator: ObjectId('5ba289ba7223b9429888b9b4'),
    entryCode: 'rare-shrimp-10',
    dueDate: null,
    createdAt: ISODate('2018-09-19T16:44:22.490Z'),
    updatedAt: ISODate('2018-09-19T16:44:22.490Z'),
    __v: 0,
  },

  /* 3 */
  {
    _id: ObjectId('5ba289c57223b9429888b9b3'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5d3b493dca44f53a90a9ed35')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'wrong entry code room',
    description: 'hello',
    entryCode: 'hello',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73ed8'),
        user: ObjectId('5ba289ba7223b9429888b9b4'),
        role: 'facilitator',
      },
    ],
    creator: ObjectId('5ba289ba7223b9429888b9b4'),
    dueDate: null,
    createdAt: ISODate('2018-09-19T13:26:22.410Z'),
    updatedAt: ISODate('2018-09-19T13:26:22.410Z'),
    __v: 0,
  },

  /* 4 */
  {
    _id: ObjectId('5c2e58e4684f328cbca1d997'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5c2e58e4684f328cbca1d998')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: "Deanna's stand alone room",
    description: '',
    creator: ObjectId('5be1eba75854270cd0920faa'),
    image:
      'https://www.tinygraphs.com/spaceinvaders/gfggfg?theme=daisygarden&numcolors=4&size=220&fmt=svg',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73eda'),
        user: ObjectId('5be1eba75854270cd0920faa'),
        role: 'facilitator',
      },
    ],
    dueDate: null,
    createdAt: ISODate('2019-01-03T18:48:04.573Z'),
    updatedAt: ISODate('2019-01-03T18:48:04.573Z'),
    __v: 0,
  },

  /* 5 */
  {
    _id: ObjectId('5ba289c57223b9429888b9b6'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5d3b493dca44f53a90a9ed35')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'room 2',
    description: 'hello',
    entryCode: 'hello',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73ed6'),
        user: ObjectId('5ba289ba7223b9429888b9b4'),
        role: 'facilitator',
      },
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73ed5'),
        user: ObjectId('5bbbbd9a799302265829f5af'),
        role: 'participant',
      },
    ],
    creator: ObjectId('5ba289ba7223b9429888b9b4'),
    dueDate: null,
    createdAt: ISODate('2018-09-19T12:21:14.290Z'),
    updatedAt: ISODate('2018-09-19T12:21:14.290Z'),
    __v: 0,
  },

  /* 6 */
  {
    _id: ObjectId('5c2e58e4684f328cbca1d99f'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5c2e58e4684f328cbca1d998')],
    privacySetting: 'public',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: "Deanna's course 1 room",
    description: '',
    creator: ObjectId('5be1eba75854270cd0920faa'),
    image:
      'https://www.tinygraphs.com/spaceinvaders/gfggfg?theme=daisygarden&numcolors=4&size=220&fmt=svg',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73edc'),
        user: ObjectId('5be1eba75854270cd0920faa'),
        role: 'facilitator',
      },
    ],
    entryCode: 'testEntrycode',
    dueDate: null,
    createdAt: ISODate('2019-01-03T13:28:14.973Z'),
    updatedAt: ISODate('2019-01-03T13:28:14.973Z'),
    __v: 0,
  },

  /* 7 */
  {
    _id: ObjectId('5c2e58e4684f328cbca1d99e'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5c2e58e4684f328cbca1d998')],
    privacySetting: 'public',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: "Deanna's course 2 room",
    description: '',
    creator: ObjectId('5be1eba75854270cd0920faa'),
    image:
      'https://www.tinygraphs.com/spaceinvaders/gfggfg?theme=daisygarden&numcolors=4&size=220&fmt=svg',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73ede'),
        user: ObjectId('5be1eba75854270cd0920faa'),
        role: 'facilitator',
      },
    ],
    dueDate: null,
    createdAt: ISODate('2019-01-03T09:18:34.333Z'),
    updatedAt: ISODate('2019-01-03T09:18:34.333Z'),
    __v: 0,
  },

  /* 8 */
  {
    _id: ObjectId('5c2e58e4684f328cbca1dace'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5c2e58e4684f328cbca1d998')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: "Q's Admin Room",
    description: '',
    creator: ObjectId('5ba289ba7223b9429888b9ee'),
    image:
      'https://www.tinygraphs.com/spaceinvaders/gfggfg?theme=daisygarden&numcolors=4&size=220&fmt=svg',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d0f0a93908fe576b73ee0'),
        user: ObjectId('5ba289ba7223b9429888b9ee'),
        role: 'facilitator',
      },
    ],
    dueDate: null,
    createdAt: ISODate('2019-01-03T17:21:56.222Z'),
    updatedAt: ISODate('2019-01-03T17:21:56.222Z'),
    __v: 0,
  },

  /* 9 */
  {
    _id: ObjectId('5d0d2ed0535e3a522445f7a7'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [
      ObjectId('5d0d2ee62d386ba92eb7e34c'),
      ObjectId('5d0d2eea65fc7fd8b17ccd19'),
      ObjectId('5d0d2efc5faad4ca26214f33'),
      ObjectId('5d0d2f0748e22b165488897c'),
      ObjectId('5d0d2f1634e454ff962b358f'),
      ObjectId('5d0d2f27e99a7ffce8aae28e'),
      ObjectId('5d0d2f2c535e3a522445f7c0'),
    ],
    currentMembers: [],
    tabs: [ObjectId('5d0d2ed0535e3a522445f7a9')],
    privacySetting: 'public',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'reference room',
    description: 'room for testing the reference tool',
    creator: ObjectId('5d0d2eae535e3a522445f7a4'),
    course: null,
    image:
      'https://www.tinygraphs.com/spaceinvaders/reference room?theme=heatwave&numcolors=4&size=220&fmt=svg',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d0d2ed0535e3a522445f7a8'),
        user: ObjectId('5d0d2eae535e3a522445f7a4'),
        role: 'facilitator',
      },
    ],
    dueDate: null,
    createdAt: ISODate('2019-06-21T19:24:00.104Z'),
    updatedAt: ISODate('2019-06-21T19:25:32.404Z'),
    __v: 0,
  },

  /* 10 */
  {
    _id: ObjectId('5d83f00add0c4946d81684cc'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5d83f00add0c4946d81684ce')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'ssmith desmos fun',
    description: 'desmos test room',
    creator: ObjectId('5d1a59d79c78ad48c0480caa'),
    course: null,
    image:
      'https://www.tinygraphs.com/spaceinvaders/ssmith desmos fun?theme=seascape&numcolors=4&size=220&fmt=svg',
    entryCode: 'calm-penguin-87',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d83f00add0c4946d81684cd'),
        user: ObjectId('5d1a59d79c78ad48c0480caa'),
        role: 'facilitator',
      },
    ],
    dueDate: ISODate('2021-05-28T04:00:00.000Z'),
    createdAt: ISODate('2019-09-19T21:15:54.402Z'),
    updatedAt: ISODate('2019-09-19T21:15:54.402Z'),
    __v: 0,
  },

  /* 11 */
  {
    _id: ObjectId('5d83f029dd0c4946d81684d2'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [
      ObjectId('5d8e1c20f61e66114f5a9aab'),
      ObjectId('5d8e1c37fc4d0b4c1c8873ba'),
      ObjectId('5d8e1c9583074a44e85d97e0'),
      ObjectId('5d8e1ca633014c946f1fcb6e'),
    ],
    currentMembers: [],
    tabs: [ObjectId('5d83f029dd0c4946d81684d4')],
    privacySetting: 'public',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'ssmith public desmos',
    description: 'public desmos room',
    creator: ObjectId('5d1a59d79c78ad48c0480caa'),
    course: null,
    image:
      'https://www.tinygraphs.com/spaceinvaders/ssmith public desmos?theme=berrypie&numcolors=4&size=220&fmt=svg',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d83f029dd0c4946d81684d3'),
        user: ObjectId('5d1a59d79c78ad48c0480caa'),
        role: 'facilitator',
      },
    ],
    dueDate: null,
    createdAt: ISODate('2019-09-19T21:16:25.896Z'),
    updatedAt: ISODate('2019-09-27T14:28:54.455Z'),
    __v: 0,
  },

  /* 12 */
  {
    _id: ObjectId('5d83f39a15329f5bfcd49c0f'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5d83f39a15329f5bfcd49c11')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'ssmith c1: triangles',
    description: 'first room in c1',
    creator: ObjectId('5d1a59d79c78ad48c0480caa'),
    course: ObjectId('5d83f32415329f5bfcd49c0c'),
    image:
      'https://www.tinygraphs.com/spaceinvaders/ssmith c1: triangles?theme=bythepool&numcolors=4&size=220&fmt=svg',
    entryCode: 'serious-mayfly-48',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d83f39a15329f5bfcd49c10'),
        user: ObjectId('5d1a59d79c78ad48c0480caa'),
        role: 'facilitator',
      },
    ],
    dueDate: null,
    createdAt: ISODate('2019-09-19T21:31:06.118Z'),
    updatedAt: ISODate('2019-09-19T21:31:06.118Z'),
    __v: 0,
  },

  /* 13 */
  {
    _id: ObjectId('5d83f3b615329f5bfcd49c15'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5d83f3b615329f5bfcd49c17')],
    privacySetting: 'private',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'ssmith c1: squares',
    description: '',
    creator: ObjectId('5d1a59d79c78ad48c0480caa'),
    course: ObjectId('5d83f32415329f5bfcd49c0c'),
    image:
      'https://www.tinygraphs.com/spaceinvaders/ssmith c1: squares?theme=duskfalling&numcolors=4&size=220&fmt=svg',
    entryCode: 'clever-seahorse-28',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d83f3b615329f5bfcd49c16'),
        user: ObjectId('5d1a59d79c78ad48c0480caa'),
        role: 'facilitator',
      },
    ],
    dueDate: null,
    createdAt: ISODate('2019-09-19T21:31:34.750Z'),
    updatedAt: ISODate('2019-09-19T21:31:34.750Z'),
    __v: 0,
  },

  /* 14 */
  {
    _id: ObjectId('5d83f42e15329f5bfcd49c21'),
    settings: {
      participantsCanCreateTabs: false,
      participantsCanChangePerspective: false,
      controlByTab: false,
    },
    chat: [],
    currentMembers: [],
    tabs: [ObjectId('5d83f42e15329f5bfcd49c23')],
    privacySetting: 'public',
    tempRoom: false,
    controlledBy: null,
    isTrashed: false,
    name: 'math is fun roomA',
    description: '',
    creator: ObjectId('5d1a59d79c78ad48c0480caa'),
    course: ObjectId('5d83f32415329f5bfcd49c0c'),
    image:
      'https://www.tinygraphs.com/spaceinvaders/math is fun roomA?theme=sugarsweets&numcolors=4&size=220&fmt=svg',
    members: [
      {
        color: '#f26247',
        _id: ObjectId('5d83f42e15329f5bfcd49c22'),
        user: ObjectId('5d1a59d79c78ad48c0480caa'),
        role: 'facilitator',
      },
    ],
    dueDate: null,
    createdAt: ISODate('2019-09-19T21:33:34.796Z'),
    updatedAt: ISODate('2019-09-19T21:33:34.796Z'),
    __v: 0,
  },
];
