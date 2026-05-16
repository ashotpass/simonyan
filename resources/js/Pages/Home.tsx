import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { localePath, t } from '@/i18n';
import type { PageRecord, ServiceRecord, SharedProps } from '@/types';

interface Props {
    page: PageRecord;
    services: ServiceRecord[];
}

export default function Home({ page, services }: Props) {
    const { locale, settings } = usePage<SharedProps>().props;
    const title = page?.[`title_${locale}`] ?? 'Home';
    const body = page?.[`body_${locale}`] ?? '';
    const address = settings?.address_hy?.hy || 'Մաշտոց 33/1, Yerevan';
    const phone = settings?.phone?.[locale] ?? '';
    const email = settings?.email?.[locale] ?? '';

    const whyBullets: Array<keyof ReturnType<typeof bullets>> = ['why_1', 'why_2', 'why_3', 'why_4'];
    function bullets() {
        return { why_1: '', why_2: '', why_3: '', why_4: '' };
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: locale === 'hy' ? 'Սիմոնյան և որդիներ' : 'Simonyan and Sons',
        description: page?.[`meta_description_${locale}`] ?? '',
        url: typeof window !== 'undefined' ? window.location.href : '',
        telephone: phone,
        email: email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Mashtots 33/1',
            addressLocality: 'Yerevan',
            addressCountry: 'AM',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 40.1872, longitude: 44.5152 },
        areaServed: 'AM',
    };

    return (
        <PublicLayout
            title={page?.[`meta_title_${locale}`] || title}
            description={page?.[`meta_description_${locale}`] || ''}
            pathHy="/hy"
            pathEn="/en"
        >
            <Head>
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Head>

            <section className="relative bg-gradient-to-br from-cream via-cream to-amber-50/40 py-20 md:py-28">
                <div className="container-x grid md:grid-cols-2 gap-10 items-center">
                    <div data-fade>
                        <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">
                            {locale === 'hy' ? 'Փաստաբանական ընկերություն' : 'Law Firm'}
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-charcoal">
                            {locale === 'hy' ? 'Սիմոնյան և որդիներ' : 'Simonyan and Sons'}
                        </h1>
                        <p className="text-lg text-charcoal/80 leading-relaxed mb-8 prose-body">{body}</p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={localePath(locale, 'contact')} className="btn-gold">{t(locale, 'cta_consult')}</Link>
                            <Link href={localePath(locale, 'services')} className="btn-outline">{t(locale, 'nav_services')}</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gold/10 rounded-full blur-3xl" />
                            <img src="/assets/logo.png" alt="" className="relative w-72 lg:w-80 opacity-90" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container-x">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal" data-fade>
                        {t(locale, 'why_title')}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyBullets.map((k, i) => (
                            <div key={k} className="bg-cream p-6 border-l-4 border-gold" data-fade style={{ animationDelay: `${i * 100}ms` }}>
                                <span className="text-gold text-3xl font-serif-en">0{i + 1}</span>
                                <p className="mt-3 text-charcoal/90">{t(locale, k)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-cream">
                <div className="container-x">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-charcoal" data-fade>
                        {t(locale, 'services_title')}
                    </h2>
                    <div className="w-16 h-px bg-gold mx-auto mb-12" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((s, i) => (
                            <Link
                                key={s.id}
                                href={localePath(locale, 'services', s.slug)}
                                className="bg-white p-8 border border-charcoal/5 hover:border-gold transition-colors group block"
                                data-fade
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-gold transition-colors">
                                    {s[`title_${locale}`]}
                                </h3>
                                <p className="text-sm text-charcoal/70 line-clamp-3 prose-body">
                                    {(s[`body_${locale}`] ?? '').split('\n')[0]}
                                </p>
                                <span className="inline-block mt-4 text-gold text-sm font-medium">
                                    {t(locale, 'learn_more')} →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-charcoal text-cream">
                <div className="container-x text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold max-w-3xl mx-auto mb-8 leading-relaxed" data-fade>
                        {t(locale, 'cta_banner')}
                    </h2>
                    <Link href={localePath(locale, 'contact')} className="btn-gold">{t(locale, 'cta_consult')}</Link>
                </div>
            </section>
        </PublicLayout>
    );
}
