import { usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { t } from '@/i18n';
import type { PageRecord, SharedProps } from '@/types';

interface Props { page: PageRecord; }

export default function Contact({ page }: Props) {
    const { locale, settings } = usePage<SharedProps>().props;
    const title = page?.[`title_${locale}`] ?? 'Contact';
    const body = page?.[`body_${locale}`] ?? '';
    const phone = settings?.phone?.[locale] ?? '';
    const email = settings?.email?.[locale] ?? '';
    const address = settings?.[`address_${locale}`]?.[locale] ?? '';
    const hours = settings?.[`working_hours_${locale}`]?.[locale] ?? '';
    const fb = settings?.facebook_url?.[locale] ?? '';
    const mapEmbed = settings?.google_maps_embed?.hy || settings?.google_maps_embed?.en || '';

    return (
        <PublicLayout
            title={page?.[`meta_title_${locale}`] || title}
            description={page?.[`meta_description_${locale}`] || ''}
            pathHy="/hy/kap"
            pathEn="/en/contact"
        >
            <section className="py-20 bg-cream">
                <div className="container-x max-w-5xl">
                    <div className="text-center mb-14" data-fade>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
                        <div className="w-16 h-px bg-gold mx-auto mb-6" />
                        <p className="prose-body text-lg max-w-2xl mx-auto">{body}</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        <div className="space-y-6" data-fade>
                            <ContactInfo label={t(locale, 'address')} value={address} />
                            <ContactInfo label={t(locale, 'phone')} value={phone} href={phone ? `tel:${phone.replace(/\s+/g, '')}` : undefined} />
                            <ContactInfo label={t(locale, 'email')} value={email} href={email ? `mailto:${email}` : undefined} />
                            <ContactInfo label={t(locale, 'hours')} value={hours} />
                            {fb && (
                                <div>
                                    <h4 className="text-gold text-xs uppercase tracking-wider mb-1">Facebook</h4>
                                    <a href={fb} target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-gold">
                                        {fb}
                                    </a>
                                </div>
                            )}
                        </div>

                        {mapEmbed && (
                            <div className="aspect-video w-full overflow-hidden border border-charcoal/10" data-fade>
                                <iframe
                                    src={mapEmbed}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Map"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function ContactInfo({ label, value, href }: { label: string; value: string; href?: string }) {
    if (!value) return null;
    return (
        <div>
            <h4 className="text-gold text-xs uppercase tracking-wider mb-1">{label}</h4>
            {href ? (
                <a href={href} className="text-charcoal hover:text-gold whitespace-pre-line">{value}</a>
            ) : (
                <p className="text-charcoal whitespace-pre-line">{value}</p>
            )}
        </div>
    );
}
