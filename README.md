<h1 align="center">Social Media Website</h1>
<p align="center">
  <a href="https://github.com/vihao1802/Social-Media-Client/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
  </a>
  <a href=" https://github.com/vihao1802/social-media-client-microservice/watchers">
    <img alt="GitHub" src="https://img.shields.io/github/watchers/vihao1802/social-media-client-microservice" target="_blank" />
  </a>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB"/></a>&nbsp
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?logo=mui&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white"/></a>&nbsp 
</p>

> `Social Media Website` that provides an minimal UI with various features such as creat post, react post, comment, chat real-time, call video, watch stories and reels, etc.

<!-- <img src="/docs/screenshot.png" width="100%"> -->

<!-- ### 📄 PDF: <a href="" target="_blank">Link</a> -->
<!-- ### 📄 Slide: <a href="" target="_blank">Link</a> -->

## 🎉 Tech Stack

### Frontend

- `React.js`: JavaScript library for building dynamic, reusable UI components.
- `Next.js`: React framework for server-side rendering (SSR) and static site generation (SSG).
- `Material UI`: React component library implementing Google's Material Design for responsive UIs.
- `TypeScript`: JavaScript superset offering static typing for better code quality.
- `Tailwind CSS`: utility-first CSS framework for rapid and flexible styling.
- `SWR`: lightweight library for data fetching, caching, and revalidation in React.
- `WebSocket`: protocol enabling real-time, two-way communication between client and server.
- `Stream.io`: platform for building scalable real-time features like feeds, chat, and video calls.

### Others
- `Node.js (v22+)`: Backend runtime environment for the development and execution of the frontend.
- `npm`: Package manager to handle JavaScript libraries and dependencies.

### APIs

- RESTful APIs are used to handle interactions between the frontend and backend, ensuring scalability and performance.

## 📷 Screenshots

➡️ Let's go to take a look at our project

- Go to this: <a href="https://github.com/vihao1802/social-media-client-microservice/blob/main/SCREENSHOTS.md" target="_blank">SCREENSHOTS.md</a>

<!-- GETTING STARTED -->

## 🎯 Getting Started

- You can view this website backend in repo at: <a href="https://github.com/vihao1802/social-media-server-microservice" target="_blank">Social Media Server Microservice</a>

### 💎 Prerequisites

You should create a `main` directory to wrap 2 repo (client and server) of this system

- npm(comes with node)

### ⚙️ Installation

#### 🔧 Frontend

1. Clone the repo in the `main` directory

```sh
git clone https://github.com/vihao1802/social-media-client-microservice
```

```sh
git clone https://github.com/vihao1802/social-media-server-microservice
```

2. Install libraries and dependencies (For client folder):

```
cd client
```

```
npm install
```

3. Create file `.env.local` in folder `client`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080/api
```

## 🚀 Usage

### Client ( Run in termnial ):

- From `main` directory

```
cd client
```

- Run `client`

```
npm run dev
```

## ✨ Code Contributors

- This project exists thanks to all the people who contribute.

<a href="https://github.com/vihao1802/social-media-client-microservice/graphs/contributors">
<img src="https://contrib.rocks/image?repo=vihao1802/social-media-client-microservice" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## 📝 License

Copyright © 2024 [Tran Vi Hao](https://github.com/vihao1802).<br />
This project is [MIT](https://github.com/vihao1802/Social-Media-Client/blob/main/LICENSE) licensed.
