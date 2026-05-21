import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';
import { localePath, switchUrl, t } from '@/i18n';
import type { SharedProps, Locale } from '@/types';

interface Props {
    children: ReactNode;
    title?: string;
    description?: string;
    pathHy: string;
    pathEn: string;
    image?: string;
}

export default function PublicLayout({ children, title, description, pathHy, pathEn, image }: Props) {
    const page = usePage<SharedProps>();
    const { locale, alt_locale, settings, flash } = page.props;
    const url = page.url;
    const phone = settings?.phone?.[locale] ?? '';
    const email = settings?.email?.[locale] ?? '';
    const address = settings?.[`address_${locale}`]?.[locale] ?? settings?.[`address_${locale}`]?.[locale === 'hy' ? 'hy' : 'en'] ?? '';
    const hours = settings?.[`working_hours_${locale}`]?.[locale] ?? settings?.[`working_hours_${locale}`]?.[locale === 'hy' ? 'hy' : 'en'] ?? '';
    const fb = settings?.facebook_url?.[locale] ?? '';
    const appUrl = typeof window !== 'undefined' ? window.location.origin : '';

    const companyName = t(locale, 'company_name');
    const fullTitle = title ? `${title} — ${companyName}` : t(locale, 'default_meta_title');
    const desc = description || t(locale, 'default_meta_description');

    const [cookieAccepted, setCookieAccepted] = useState(true);
    useEffect(() => {
        try { setCookieAccepted(localStorage.getItem('cookie_consent') === '1'); } catch {}
    }, []);
    function acceptCookies() {
        try { localStorage.setItem('cookie_consent', '1'); } catch {}
        setCookieAccepted(true);
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('fade-in'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('[data-fade]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [url]);

    return (
        <>
            <Head>
                <title>{fullTitle}</title>
                <meta name="description" content={desc} />
                <meta property="og:title" content={fullTitle} />
                <meta property="og:description" content={desc} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content={locale === 'hy' ? 'hy_AM' : 'en_US'} />
                {image && <meta property="og:image" content={image} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={fullTitle} />
                <meta name="twitter:description" content={desc} />
                <link rel="alternate" hrefLang="hy" href={`${appUrl}${pathHy}`} />
                <link rel="alternate" hrefLang="en" href={`${appUrl}${pathEn}`} />
                <link rel="alternate" hrefLang="x-default" href={`${appUrl}${pathHy}`} />
                <link rel="canonical" href={`${appUrl}${locale === 'hy' ? pathHy : pathEn}`} />
            </Head>

            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-gold text-white px-3 py-2 z-50">
                {t(locale, 'skip_to_content')}
            </a>

            <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-charcoal/10">
                <div className="container-x flex items-center justify-between py-4 gap-4">
                    <Link href={localePath(locale, 'home')} className="flex items-center gap-3 shrink-0">
                        <img src="/assets/logo.png" alt={companyName} className="h-12 w-auto" />
                        <span className="hidden md:block leading-tight">
                            <span className="block text-base font-semibold text-charcoal">
                                {companyName}
                            </span>
                            <span className="block text-xs text-charcoal/60 tracking-wider uppercase">
                                {t(locale, 'company_tagline')}
                            </span>
                        </span>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-7 text-[15px]">
                        <Link href={localePath(locale, 'home')} className="hover:text-gold transition-colors">{t(locale, 'nav_home')}</Link>
                        <Link href={localePath(locale, 'about')} className="hover:text-gold transition-colors">{t(locale, 'nav_about')}</Link>
                        <Link href={localePath(locale, 'services')} className="hover:text-gold transition-colors">{t(locale, 'nav_services')}</Link>
                        <Link href={localePath(locale, 'director')} className="hover:text-gold transition-colors">{t(locale, 'nav_director')}</Link>
                        <Link href={localePath(locale, 'contact')} className="hover:text-gold transition-colors">{t(locale, 'nav_contact')}</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher current={locale} alt={alt_locale} url={url} />
                        {phone && <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hidden md:inline text-gold font-medium text-sm">{phone}</a>}
                        <Link href={localePath(locale, 'contact')} className="lg:hidden text-sm border border-gold text-gold px-3 py-1.5 rounded-sm">
                            {t(locale, 'nav_contact')}
                        </Link>
                    </div>
                </div>
                <nav className="lg:hidden border-t border-charcoal/10 bg-cream">
                    <div className="container-x flex overflow-x-auto gap-5 py-2 text-sm">
                        <Link href={localePath(locale, 'home')} className="shrink-0 hover:text-gold">{t(locale, 'nav_home')}</Link>
                        <Link href={localePath(locale, 'about')} className="shrink-0 hover:text-gold">{t(locale, 'nav_about')}</Link>
                        <Link href={localePath(locale, 'services')} className="shrink-0 hover:text-gold">{t(locale, 'nav_services')}</Link>
                        <Link href={localePath(locale, 'director')} className="shrink-0 hover:text-gold">{t(locale, 'nav_director')}</Link>
                        <Link href={localePath(locale, 'contact')} className="shrink-0 hover:text-gold">{t(locale, 'nav_contact')}</Link>
                    </div>
                </nav>
            </header>

            {flash?.success && (
                <div className="bg-emerald-600 text-white text-center py-3 text-sm">{flash.success}</div>
            )}
            {flash?.error && (
                <div className="bg-red-600 text-white text-center py-3 text-sm">{flash.error}</div>
            )}

            <main id="main" className="min-h-[60vh]">{children}</main>

            <footer className="bg-charcoal text-cream mt-20 pt-16 pb-8">
                <div className="container-x grid gap-10 md:grid-cols-4">
                    <div>
                        <img src="/assets/logo.png" alt="" className="h-14 mb-4" />
                        <p className="text-sm text-cream/80 leading-relaxed">
                            {t(locale, 'company_footer')}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-gold font-semibold mb-3 text-sm tracking-wider uppercase">{t(locale, 'address')}</h4>
                        <p className="text-sm text-cream/80">{address}</p>
                    </div>
                    <div>
                        <h4 className="text-gold font-semibold mb-3 text-sm tracking-wider uppercase">{t(locale, 'phone')} / {t(locale, 'email')}</h4>
                        {phone && <p className="text-sm"><a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-gold">{phone}</a></p>}
                        {email && <p className="text-sm"><a href={`mailto:${email}`} className="hover:text-gold">{email}</a></p>}
                        {fb && <p className="text-sm mt-2"><a href={fb} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Facebook</a></p>}
                    </div>
                    <div>
                        <h4 className="text-gold font-semibold mb-3 text-sm tracking-wider uppercase">{t(locale, 'hours')}</h4>
                        <p className="text-sm text-cream/80 whitespace-pre-line">{hours}</p>
                    </div>
                </div>
                <div className="container-x border-t border-cream/10 mt-10 pt-6 text-center text-xs text-cream/60">
                    © {new Date().getFullYear()} {companyName}. {t(locale, 'rights')}.
                </div>
            </footer>

            {!cookieAccepted && (
                <div className="fixed bottom-0 inset-x-0 bg-charcoal text-cream p-4 z-50 shadow-lg">
                    <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                        <p>{t(locale, 'cookie_text')}</p>
                        <button onClick={acceptCookies} className="bg-gold text-white px-5 py-2 rounded-sm">{t(locale, 'cookie_accept')}</button>
                    </div>
                </div>
            )}
        </>
    );
}

function LanguageSwitcher({ current, alt, url }: { current: Locale; alt: Locale; url: string }) {
    const target = switchUrl(url, current, alt);
    return (
        <a href={target} className="text-sm font-medium border border-charcoal/20 px-2 py-1 rounded-sm hover:border-gold hover:text-gold" aria-label="Switch language">
            <span className={current === 'hy' ? 'text-gold' : 'text-charcoal/60'}>HY</span>
            <span className="mx-1 text-charcoal/30">|</span>
            <span className={current === 'en' ? 'text-gold' : 'text-charcoal/60'}>EN</span>
        </a>
    );
}
