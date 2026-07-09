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
        // Твое изображение, переведенное в строку Base64
        image: "data:image/png;base64,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",
        github: "https://github.com/b4631119-oss/jerdesh-moscva", // Ссылка на гитхаб репозиторий
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
