export enum ROUTES {
  home = "/",
onboarding = "/onboarding",
  search = "/search",
  activity = "/activity",
  create = "/create-thread",
  profile = "/profile",
  thread = "/thread",
  editprofile = "/profile/edit",
}

export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: ROUTES.home,
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: ROUTES.search,
    label: "Search",
  },
  {
    imgURL: "/assets/heart.svg",
    route: ROUTES.activity,
    label: "Activity",
  },
  {
    imgURL: "/assets/create.svg",
    route: ROUTES.create,
    label: "Create Thread",
  },
  {
    imgURL: "/assets/user.svg",
    route: ROUTES.profile,
    label: "Profile",
  },
];

export const profileTabs = [
  {
    value: "threads",
    label: "Threads",
    icon: "/assets/reply.svg",
  },
  {
    value: "replies",
    label: "Replies",
    icon: "/assets/members.svg",
  },
  {
    value: "tagged",
    label: "Tagged",
    icon: "/assets/tag.svg",
  },
];
