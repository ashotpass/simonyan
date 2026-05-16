import { Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { localePath, t } from '@/i18n';
import type { DirectorRecord, PageRecord, SharedProps } from '@/types';

interface Props { page: PageRecord; director: DirectorRecord | null; }

export default function About({ page, director }: Props) {
    const { locale } = usePage<SharedProps>().props;
    const title = page?.[`title_${locale}`] ?? 'About';
    const body = page?.[`body_${locale}`] ?? '';

    return (
        <PublicLayout
            title={page?.[`meta_title_${locale}`] || title}
            description={page?.[`meta_description_${locale}`] || ''}
            pathHy="/hy/mer-masin"
            pathEn="/en/about"
        >
            <section className="py-20 bg-cream">
                <div className="container-x max-w-4xl" data-fade>
                    <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">
                        {locale === 'hy' ? 'Մեր մասին' : 'About'}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">{title}</h1>
                    <div className="w-16 h-px bg-gold mb-8" />
                    <div className="prose-body text-lg">{body}</div>

                    {director && (
                        <div className="mt-16 pt-12 border-t border-charcoal/10">
                            <h2 className="text-2xl font-semibold mb-4">{t(locale, 'director_meet')}</h2>
                            <p className="mb-2">
                                <span className="font-medium">{director[`full_name_${locale}`]}</span>
                                {director[`title_${locale}`] && <span className="text-charcoal/70"> — {director[`title_${locale}`]}</span>}
                            </p>
                            <p className="text-charcoal/70 mb-6">{director.years_experience} {t(locale, 'years_exp')}</p>
                            <Link href={localePath(locale, 'director')} className="btn-outline">{t(locale, 'learn_more')}</Link>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
