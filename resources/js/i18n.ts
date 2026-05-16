import type { Locale } from './types';

const dict = {
    hy: {
        nav_home: 'Գլխավոր',
        nav_about: 'Մեր մասին',
        nav_services: 'Ծառայություններ',
        nav_director: 'Տնօրեն',
        nav_contact: 'Կապ',
        cta_consult: 'Կապվել մեզ հետ',
        why_title: 'Ինչու են մեզ վստահում',
        why_1: 'Բազմամյա փորձ',
        why_2: 'Անհատական պաշտպանական ռազմավարություն յուրաքանչյուր գործի համար',
        why_3: 'Ակտիվ և հետևողական պաշտպանություն նախաքննության և դատարանում',
        why_4: 'Գաղտնիություն, պատասխանատվություն և վստահություն',
        cta_banner: 'Ձեր գործը վստահեք նրանց, ովքեր պաշտպանում են ոչ թե խոսքերով, այլ արդյունքներով',
        learn_more: 'Իմանալ ավելին',
        contact_us: 'Կապվել մեզ հետ',
        services_title: 'Մեր ծառայությունները',
        years_exp: 'տարվա փորձ',
        expertise: 'Մասնագիտացում',
        address: 'Հասցե',
        phone: 'Հեռախոս',
        email: 'Էլ. փոստ',
        hours: 'Աշխատանքային ժամեր',
        form_name: 'Անուն',
        form_email: 'Էլ. փոստ',
        form_phone: 'Հեռախոս',
        form_message: 'Հաղորդագրություն',
        form_send: 'Ուղարկել',
        form_sending: 'Ուղարկվում է…',
        cookie_text: 'Մենք օգտագործում ենք քուքիներ՝ կայքի աշխատանքը բարելավելու համար:',
        cookie_accept: 'Համաձայն եմ',
        director_meet: 'Մեր տնօրենը',
        rights: 'Բոլոր իրավունքները պաշտպանված են',
    },
    en: {
        nav_home: 'Home',
        nav_about: 'About',
        nav_services: 'Services',
        nav_director: 'Director',
        nav_contact: 'Contact',
        cta_consult: 'Contact Us',
        why_title: 'Why clients trust us',
        why_1: 'Years of experience',
        why_2: 'Individual defense strategy for every case',
        why_3: 'Active and consistent defense at pre-trial and in court',
        why_4: 'Confidentiality, responsibility, and trust',
        cta_banner: 'Trust your case to those who defend not with words, but with results',
        learn_more: 'Learn more',
        contact_us: 'Contact Us',
        services_title: 'Our services',
        years_exp: 'years of experience',
        expertise: 'Expertise',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        hours: 'Working hours',
        form_name: 'Name',
        form_email: 'Email',
        form_phone: 'Phone',
        form_message: 'Message',
        form_send: 'Send',
        form_sending: 'Sending…',
        cookie_text: 'We use cookies to improve your experience on this site.',
        cookie_accept: 'Accept',
        director_meet: 'Meet our director',
        rights: 'All rights reserved',
    },
} as const;

export type Dict = typeof dict.en;

export function t(locale: Locale, key: keyof Dict): string {
    return dict[locale][key] ?? dict.en[key];
}

const slugs = {
    hy: { home: '', about: 'mer-masin', services: 'tsarayutyunner', director: 'tnoren', contact: 'kap' },
    en: { home: '', about: 'about', services: 'services', director: 'director', contact: 'contact' },
} as const;

export function localePath(locale: Locale, key: keyof typeof slugs.hy, extra = ''): string {
    const base = `/${locale}`;
    const segment = slugs[locale][key];
    const path = segment ? `${base}/${segment}` : base;
    return extra ? `${path}/${extra}` : path;
}

export function switchUrl(currentPath: string, from: Locale, to: Locale): string {
    // map slugs back and forth
    const reverseMap = Object.entries(slugs[from]).reduce<Record<string, keyof typeof slugs.hy>>((acc, [k, v]) => {
        if (v) acc[v] = k as keyof typeof slugs.hy;
        return acc;
    }, {});

    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length === 0 || (parts[0] !== from && parts[0] !== to)) return `/${to}`;
    if (parts.length === 1) return `/${to}`;
    const key = reverseMap[parts[1]];
    if (!key) return `/${to}`;
    const newSeg = slugs[to][key];
    const rest = parts.slice(2).join('/');
    let url = `/${to}`;
    if (newSeg) url += `/${newSeg}`;
    if (rest) url += `/${rest}`;
    return url;
}
