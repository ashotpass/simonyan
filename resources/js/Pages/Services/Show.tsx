import { Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { localePath, t } from '@/i18n';
import type { ServiceRecord, SharedProps } from '@/types';

interface Props { service: ServiceRecord; services: ServiceRecord[]; }

export default function ServiceShow({ service, services }: Props) {
    const { locale } = usePage<SharedProps>().props;
    const title = service[`title_${locale}`];
    const body = service[`body_${locale}`] ?? '';

    return (
        <PublicLayout
            title={service[`meta_title_${locale}`] || title}
            description={service[`meta_description_${locale}`] || ''}
            pathHy={`/hy/tsarayutyunner/${service.slug}`}
            pathEn={`/en/services/${service.slug}`}
        >
            <section className="py-20 bg-cream">
                <div className="container-x grid lg:grid-cols-3 gap-10">
                    <article className="lg:col-span-2 max-w-3xl" data-fade>
                        <Link href={localePath(locale, 'services')} className="text-gold text-sm mb-4 inline-block">
                            ← {t(locale, 'nav_services')}
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
                        <div className="w-16 h-px bg-gold mb-8" />
                        <div className="prose-body text-lg">{body}</div>

                        <div className="mt-12 bg-charcoal text-cream p-8">
                            <p className="text-lg mb-4">
                                {t(locale, 'service_consultation_cta')}
                            </p>
                            <Link href={localePath(locale, 'contact')} className="btn-gold">{t(locale, 'cta_consult')}</Link>
                        </div>
                    </article>

                    <aside className="bg-white p-6 border border-charcoal/5 h-fit sticky top-24">
                        <h3 className="font-semibold mb-4 text-gold uppercase text-xs tracking-wider">
                            {t(locale, 'nav_services')}
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {services.map((s) => (
                                <li key={s.id}>
                                    <Link
                                        href={localePath(locale, 'services', s.slug)}
                                        className={`block hover:text-gold ${s.id === service.id ? 'text-gold font-medium' : ''}`}
                                    >
                                        {s[`title_${locale}`]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </section>
        </PublicLayout>
    );
}
