import { Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { localePath, t } from '@/i18n';
import type { DirectorRecord, PageRecord, SharedProps } from '@/types';

interface Props { page: PageRecord; director: DirectorRecord | null; }

export default function Director({ page, director }: Props) {
    const { locale } = usePage<SharedProps>().props;
    const title = page?.[`title_${locale}`] ?? 'Director';

    return (
        <PublicLayout
            title={page?.[`meta_title_${locale}`] || title}
            description={page?.[`meta_description_${locale}`] || ''}
            pathHy="/hy/tnoren"
            pathEn="/en/director"
        >
            <section className="py-20 bg-cream">
                <div className="container-x grid md:grid-cols-3 gap-10 max-w-5xl">
                    <div data-fade>
                        <div className="aspect-[3/4] bg-charcoal/10 overflow-hidden">
                            {director?.photo ? (
                                <img src={`/storage/${director.photo}`} alt={director[`full_name_${locale}`]} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-charcoal/30">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6z"/></svg>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:col-span-2" data-fade>
                        <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">{title}</p>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{director?.[`full_name_${locale}`]}</h1>
                        {director?.[`title_${locale}`] && (
                            <p className="text-lg text-charcoal/70 mb-4">{director[`title_${locale}`]}</p>
                        )}
                        <p className="text-gold font-medium mb-8">
                            {director?.years_experience} {t(locale, 'years_exp')}
                        </p>
                        <div className="w-16 h-px bg-gold mb-8" />
                        {director?.[`bio_${locale}`] && (
                            <div className="prose-body text-lg mb-8">{director[`bio_${locale}`]}</div>
                        )}
                        {director?.[`expertise_${locale}`] && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gold mb-2">
                                    {t(locale, 'expertise')}
                                </h3>
                                <p className="prose-body">{director[`expertise_${locale}`]}</p>
                            </div>
                        )}
                        <div className="space-y-2 text-sm mb-8">
                            {director?.email && <p><strong>{t(locale, 'email')}:</strong> <a href={`mailto:${director.email}`} className="text-gold">{director.email}</a></p>}
                            {director?.phone && <p><strong>{t(locale, 'phone')}:</strong> <a href={`tel:${director.phone.replace(/\s+/g, '')}`} className="text-gold">{director.phone}</a></p>}
                        </div>
                        <Link href={localePath(locale, 'contact')} className="btn-gold">{t(locale, 'cta_consult')}</Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
