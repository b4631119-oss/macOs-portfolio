// src/lib/constants.ts

// Список обоев для рабочего стола macOS
export const wallpapersList = [
  {
    id: "sequoia",
    name: "Sequoia",
    url: "/mac-wallpaper.jpg", // Убрали точки, в Next.js пути к public идут от корня "/"
    thumbnail: "/mac-wallpaper.jpg",
  },
  {
    id: "ventura",
    name: "Ventura",
    url: "/spiderman.jpg",
    thumbnail: "/spiderman.jpg",
  },
  {
    id: "sonoma",
    name: "Sonoma",
    url: "/sonoma.jpg",
    thumbnail: "/sonoma.jpg",
  },
  {
    id: "monterey",
    name: "Monterey",
    url: "/monterey.jpg",
    thumbnail: "/monterey.jpg",
  },
];

// Кнопки управления окном (Закрыть, Свернуть, Развернуть)
export const dots = [
  { icon: "bg-red-500", fn: () => console.log("close") },
  { icon: "bg-yellow-500", fn: () => console.log("minimize") },
  { icon: "bg-green-500", fn: () => console.log("maximize") },
];

// ТВОИ РЕАЛЬНЫЕ ДАННЫЕ ДЛЯ ТЕРМИНАЛА И API ГИТХАБА
export const userDetails = {
  name: "DevRoot",
  githubUsername: "b4631119-oss"
};

// ТВОИ РЕАЛЬНЫЕ ПРОЕКТЫ
export const projects = [
  {
    title: "StarStream (Movie App)",
    description: "Это учебный проект на React (Vite, Redux Toolkit, Tailwind CSS),",
    tech: ["React", "Redux Toolkit", "Tailwind CSS", "Axios"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwc21ZgWjx5K3V4uqyoQ4yPVG9n6PRwIoXWSbxuJmAw&s=10",
    github: "https://github.com/b4631119-oss/movie-app.git",
    live: "https://github.com/b4631119-oss/movie-app.git"
  },
  {
        title: "Real-Time Chat App",
        description: "Чат-приложение с авторизацией пользователей, кастомизацией профилей и комнатами для общения в реальном времени. Реализовано на базе Firebase Firestore и Next.js.",
        tech: ["Next.js", "Firebase", "Firestore", "Tailwind CSS"],
        image: "https://img.freepik.com/premium-vector/chat-vector-icon_676179-133.jpg",
        github: "https://github.com/b4631119-oss/chat-app",
        live: "https://chat-app-beta-puce-10.vercel.app" 
    },
  {
        title: "Cuaderno",
        description: "Цифровая тетрадь для заметок и личной продуктивности. Интегрирована система кастомизации обложек, удобная структура файлов и автоматический деплой.",
        tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        image: "https://double.kg/wp-content/uploads/2c614fe6f19911eeabc9a8a15984109f_2c614fe7f19911eeabc9a8a15984109f-1024x1024.jpg", // Сюда потом закинешь скриншот интерфейса cuaderno-nine.vercel.app
        github: "https://github.com/b4631119-oss/cuaderno", // Твой репозиторий с картинки
        live: "https://cuaderno-nine.vercel.app"
    },
 
];

export interface WindowsState {
 github: boolean;
  note: boolean;
  cli: boolean;
  calender: boolean;
}