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
} from '@mui/icons-material';

export const sideBarItems = [
  {
    id: 1,
    iconNonActive: <HomeOutlined />,
    iconActive: <HomeRounded />,
    route: '/',
    label: 'Home',
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
    route: '',
    label: 'Search',
  },
  {
    id: 3,
    iconNonActive: <ExploreOutlined />,
    iconActive: <ExploreRounded />,
    route: '/explore',
    label: 'Explore',
  },
  {
    id: 4,
    iconNonActive: <VideoLibraryOutlined />,
    iconActive: <VideoLibraryRounded />,
    route: '/reels',
    label: 'Reels',
  },
  {
    id: 5,
    iconNonActive: <NearMeOutlined />,
    iconActive: <NearMeRounded />,
    route: '/messages',
    label: 'Messages',
  },
  // {
  //   id: 6,
  //   iconNonActive: <FavoriteBorderOutlined />,
  //   iconActive: <FavoriteRounded />,
  //   route: "",
  //   label: "Notifications",
  // },
  {
    id: 7,
    iconNonActive: <PeopleAltOutlined />,
    iconActive: <PeopleAltRounded />,
    route: '/friends',
    label: 'Friends',
  },
  {
    id: 8,
    iconNonActive: (
      <svg
        aria-label="New post"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>New post</title>
        <path
          d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
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
          x1="6.545"
          x2="17.455"
          y1="12.001"
          y2="12.001"
        ></line>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="12.003"
          x2="12.003"
          y1="6.545"
          y2="17.455"
        ></line>
      </svg>
    ),
    iconActive: (
      <svg
        aria-label="New post"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>New post</title>
        <path
          d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
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
          x1="6.545"
          x2="17.455"
          y1="12.001"
          y2="12.001"
        ></line>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="12.003"
          x2="12.003"
          y1="6.545"
          y2="17.455"
        ></line>
      </svg>
    ),
    route: '',
    label: 'Create',
  },
];
