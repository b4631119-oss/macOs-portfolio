// src/lib/constants.ts

// Список обоев для рабочего стола macOS
export const wallpapersList = [
  {
    id: "sequoia",
    name: "Sequoia",
    url: "/mac-wallpaper.jpg", 
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

export const dots = [
  { type: "close", icon: "bg-red-500 hover:bg-red-600" },
  { type: "minimize", icon: "bg-yellow-500 hover:bg-yellow-600" },
  { type: "maximize", icon: "bg-green-500 hover:bg-green-600" },
];


export const userDetails = {
  name: "DevRoot",
  githubUsername: "b4631119-oss"
};

// ТВОИ РЕАЛЬНЫЕ ПРОЕКТЫ
export const projects = [
  {
        title: "JERDESH-MOSCVA",
        description: "Веб-приложение для поиска жилья, работы и попутчиков в Москве. Разработано специально для удобного взаимодействия пользователей, быстрой подачи объявлений и фильтрации.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        image: "/jerdesh.png", 
        github: "https://github.com/b4631119-oss/jerdesh-moscva",
        live: "https://jerdesh-moscva.vercel.app/"
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
        image: "https://double.kg/wp-content/uploads/2c614fe6f19911eeabc9a8a15984109f_2c614fe7f19911eeabc9a8a15984109f-1024x1024.jpg",
        github: "https://github.com/b4631119-oss/cuaderno",
        live: "https://cuaderno-nine.vercel.app"
    },
];
export interface WindowsState {
  github: boolean;
  note: boolean;
  calender: boolean;
  calculator: boolean;
}
