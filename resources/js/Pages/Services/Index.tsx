import { Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { localePath, t } from '@/i18n';
import type { PageRecord, ServiceRecord, SharedProps } from '@/types';

interface Props { page: PageRecord; services: ServiceRecord[]; }

export default function ServicesIndex({ page, services }: Props) {
    const { locale } = usePage<SharedProps>().props;
    const title = page?.[`title_${locale}`] ?? 'Services';
    const body = page?.[`body_${locale}`] ?? '';

    return (
        <PublicLayout
            title={page?.[`meta_title_${locale}`] || title}
            description={page?.[`meta_description_${locale}`] || ''}
            pathHy="/hy/tsarayutyunner"
            pathEn="/en/services"
        >
            <section className="py-20 bg-cream">
                <div className="container-x max-w-5xl">
                    <div className="text-center mb-14" data-fade>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
                        <div className="w-16 h-px bg-gold mx-auto mb-6" />
                        <p className="prose-body text-lg max-w-3xl mx-auto">{body}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {services.map((s, i) => (
                            <Link
                                key={s.id}
                                href={localePath(locale, 'services', s.slug)}
                                className="bg-white p-8 border border-charcoal/5 hover:border-gold transition-all hover:-translate-y-0.5 block"
                                data-fade
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <h3 className="text-2xl font-semibold mb-3">{s[`title_${locale}`]}</h3>
                                <p className="prose-body text-sm line-clamp-3">
                                    {(s[`body_${locale}`] ?? '').split('\n')[0]}
                                </p>
                                <span className="inline-block mt-4 text-gold font-medium">
                                    {t(locale, 'learn_more')} →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
