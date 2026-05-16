export type Locale = 'hy' | 'en';

export interface PageRecord {
    id: number;
    slug: string;
    title_hy: string;
    title_en: string;
    body_hy?: string | null;
    body_en?: string | null;
    meta_title_hy?: string | null;
    meta_title_en?: string | null;
    meta_description_hy?: string | null;
    meta_description_en?: string | null;
    og_image?: string | null;
}

export interface ServiceRecord extends PageRecord {
    icon?: string | null;
    sort_order: number;
}

export interface DirectorRecord {
    id: number;
    full_name_hy: string;
    full_name_en: string;
    title_hy?: string | null;
    title_en?: string | null;
    bio_hy?: string | null;
    bio_en?: string | null;
    photo?: string | null;
    years_experience: number;
    expertise_hy?: string | null;
    expertise_en?: string | null;
    email?: string | null;
    phone?: string | null;
}

export type SettingsMap = Record<string, { hy: string | null; en: string | null }>;

export interface SharedProps {
    locale: Locale;
    alt_locale: Locale;
    settings: SettingsMap;
    recaptchaSiteKey: string | null;
    flash: { success?: string | null; error?: string | null };
    csrf: string;
    [key: string]: unknown;
}
