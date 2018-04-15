export default {
  me:{
    table: "user",
    api: {
      stream: "me",
      url: "/api/me/",
      filters: {},
      pagination: false,
    }
  },
  videos: {
    table: "videos",
    key: "id",
    api: {
      stream: "videos",
      url: "/api/videos/",
      filters: {},
      pagination: true,
    }
  },
  comments: {
    table: "comments",
    key: "id",
    api: {
      stream: "comments",
      url: "/api/comments/",
      filters: {},
      pagination: true,
    }
  },
}
