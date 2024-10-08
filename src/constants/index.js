import {
  HomeOutlined,
  HomeRounded,
  ExploreOutlined,
  ExploreRounded,
  VideoLibraryOutlined,
  VideoLibraryRounded,
  NearMeOutlined,
  NearMeRounded,
  FavoriteBorderOutlined,
  FavoriteRounded,
  PeopleAltOutlined,
  PeopleAltRounded,
} from "@mui/icons-material";

export const sideBarItems = [
  {
    id: 1,
    iconNonActive: <HomeOutlined />,
    iconActive: <HomeRounded />,
    route: "/",
    label: "Home",
  },
  {
    id: 2,
    iconNonActive: (
      <svg
        aria-label="Search"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Search</title>
        <path
          d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="16.511"
          x2="22"
          y1="16.511"
          y2="22"
        ></line>
      </svg>
    ),
    iconActive: (
      <svg
        aria-label="Search"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Search</title>
        <path
          d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        ></path>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          x1="16.511"
          x2="21.643"
          y1="16.511"
          y2="21.643"
        ></line>
      </svg>
    ),
    route: "",
    label: "Search",
  },
  {
    id: 3,
    iconNonActive: <ExploreOutlined />,
    iconActive: <ExploreRounded />,
    route: "/explore",
    label: "Explore",
  },
  {
    id: 4,
    iconNonActive: <VideoLibraryOutlined />,
    iconActive: <VideoLibraryRounded />,
    route: "/reels",
    label: "Reels",
  },
  {
    id: 5,
    iconNonActive: <NearMeOutlined />,
    iconActive: <NearMeRounded />,
    route: "/messages",
    label: "Messages",
  },
  {
    id: 6,
    iconNonActive: <FavoriteBorderOutlined />,
    iconActive: <FavoriteRounded />,
    route: "",
    label: "Notifications",
  },
  {
    id: 7,
    iconNonActive: <PeopleAltOutlined />,
    iconActive: <PeopleAltRounded />,
    route: "/friends",
    label: "Friends",
  },
];
