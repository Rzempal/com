export interface Project {
    id: string;
    slug: string;
    isEng: boolean; // true = ENG://, false = DEV://
    ctaUrl: string;
    images?: string[];
}

export interface ProjectTranslation {
    tabName: string;
    title: string;
    lead: string;
    description: string;
    ctaLabel: string;
}

// Project data (language-agnostic)
export const projects: Record<string, Project> = {
    robotyka: {
        id: "robotyka",
        slug: "robotyka",
        isEng: true,
        ctaUrl: "https://example.com/robotyka",
        images: [],
    },
    aplikacje: {
        id: "aplikacje",
        slug: "aplikacje",
        isEng: false,
        ctaUrl: "https://example.com/aplikacje",
        images: [],
    },
    www: {
        id: "www",
        slug: "www",
        isEng: false,
        ctaUrl: "https://example.com/www",
        images: [],
    },
    android: {
        id: "android",
        slug: "android",
        isEng: false,
        ctaUrl: "https://play.google.com/store/apps/details?id=com.rzempal.karton",
        images: [],
    },
};

// Polish translations
export const projectsPL: Record<string, ProjectTranslation> = {
    robotyka: {
        tabName: "ROBOTYKA_",
        title: "ROBOTYKA I AUTOMATYZACJA",
        lead: "Projektuję i programuję roboty przemysłowe.",
        description: "Od 2011 roku pracuję z robotami ABB, KUKA i FANUC. Specjalizuję się w symulacjach 3D, offline programowaniu i integracji systemów.",
        ctaLabel: "WEJDZ_",
    },
    aplikacje: {
        tabName: "APLIKACJE_",
        title: "APLIKACJE MOBILNE",
        lead: "Tworzę aplikacje na Androida i iOS.",
        description: "Wykorzystuję Flutter i React Native do budowy cross-platformowych aplikacji. Od pomysłu do publikacji w sklepach.",
        ctaLabel: "WEJDZ_",
    },
    www: {
        tabName: "WWW_",
        title: "STRONY INTERNETOWE",
        lead: "Projektuję i koduję strony www.",
        description: "Od landing pages po złożone aplikacje webowe. Next.js, React, TypeScript, Tailwind CSS.",
        ctaLabel: "WEJDZ_",
    },
    android: {
        tabName: "ANDROID_",
        title: "TWOJA DOMOWA APTECZKA Z AI",
        lead: "Nie kop w pudle. Sprawdź w telefonie.",
        description: "Skanuj leki aparatem, śledź daty ważności i miej wszystko pod kontrolą.",
        ctaLabel: "WEJDZ_",
    },
};

// English translations
export const projectsEN: Record<string, ProjectTranslation> = {
    robotyka: {
        tabName: "ROBOTICS_",
        title: "ROBOTICS & AUTOMATION",
        lead: "I design and program industrial robots.",
        description: "Since 2011, I've been working with ABB, KUKA, and FANUC robots. I specialize in 3D simulations, offline programming, and system integration.",
        ctaLabel: "ENTER_",
    },
    aplikacje: {
        tabName: "APPS_",
        title: "MOBILE APPLICATIONS",
        lead: "I build apps for Android and iOS.",
        description: "Using Flutter and React Native to create cross-platform applications. From concept to store publication.",
        ctaLabel: "ENTER_",
    },
    www: {
        tabName: "WEB_",
        title: "WEBSITES",
        lead: "I design and code websites.",
        description: "From landing pages to complex web applications. Next.js, React, TypeScript, Tailwind CSS.",
        ctaLabel: "ENTER_",
    },
    android: {
        tabName: "ANDROID_",
        title: "YOUR HOME MEDICINE CABINET WITH AI",
        lead: "Don't dig through boxes. Check your phone.",
        description: "Scan medicines with your camera, track expiry dates, and keep everything under control.",
        ctaLabel: "ENTER_",
    },
};

// Helper to get translations by locale
export function getProjectTranslations(locale: "pl" | "en") {
    return locale === "pl" ? projectsPL : projectsEN;
}
