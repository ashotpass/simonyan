import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { localePath, t } from '@/i18n';
import type { PageRecord, SharedProps } from '@/types';

interface Props { page: PageRecord; }

declare global {
    interface Window {
        grecaptcha?: {
            ready: (cb: () => void) => void;
            execute: (siteKey: string, opts: { action: string }) => Promise<string>;
        };
    }
}

export default function Contact({ page }: Props) {
    const { locale, settings, recaptchaSiteKey } = usePage<SharedProps>().props;
    const title = page?.[`title_${locale}`] ?? 'Contact';
    const body = page?.[`body_${locale}`] ?? '';
    const phone = settings?.phone?.[locale] ?? '';
    const email = settings?.email?.[locale] ?? '';
    const address = settings?.[`address_${locale === 'hy' ? 'hy' : 'en'}`]?.[locale] ?? '';
    const hours = settings?.[`working_hours_${locale === 'hy' ? 'hy' : 'en'}`]?.[locale] ?? '';
    const mapEmbed = settings?.google_maps_embed?.hy || settings?.google_maps_embed?.en || '';

    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm<{
        name: string; email: string; phone: string; message: string; recaptcha_token: string;
    }>({ name: '', email: '', phone: '', message: '', recaptcha_token: '' });

    const [recaptchaReady, setRecaptchaReady] = useState(false);
    useEffect(() => {
        if (!recaptchaSiteKey || typeof window === 'undefined') return;
        const id = 'recaptcha-script';
        if (document.getElementById(id)) { setRecaptchaReady(true); return; }
        const s = document.createElement('script');
        s.id = id;
        s.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
        s.async = true;
        s.onload = () => setRecaptchaReady(true);
        document.head.appendChild(s);
    }, [recaptchaSiteKey]);

    useEffect(() => {
        if (recentlySuccessful) reset();
    }, [recentlySuccessful, reset]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        let token = '';
        if (recaptchaSiteKey && recaptchaReady && window.grecaptcha) {
            try {
                token = await new Promise<string>((resolve) => {
                    window.grecaptcha!.ready(async () => {
                        const t = await window.grecaptcha!.execute(recaptchaSiteKey!, { action: 'contact' });
                        resolve(t);
                    });
                });
            } catch {}
        }
        setData('recaptcha_token', token);
        post(localePath(locale, 'contact'), { preserveScroll: true });
    }

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
                            <ContactInfo label={t(locale, 'phone')} value={phone} href={`tel:${phone.replace(/\s+/g, '')}`} />
                            <ContactInfo label={t(locale, 'email')} value={email} href={`mailto:${email}`} />
                            <ContactInfo label={t(locale, 'hours')} value={hours} />
                            {mapEmbed && (
                                <div className="mt-6 aspect-video w-full overflow-hidden border border-charcoal/10">
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

                        <form onSubmit={submit} className="bg-white p-8 border border-charcoal/5 space-y-4" data-fade>
                            <Field label={t(locale, 'form_name')} error={errors.name}>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="input"
                                />
                            </Field>
                            <Field label={t(locale, 'form_email')} error={errors.email}>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="input"
                                />
                            </Field>
                            <Field label={t(locale, 'form_phone')} error={errors.phone}>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="input"
                                />
                            </Field>
                            <Field label={t(locale, 'form_message')} error={errors.message}>
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    required
                                    rows={5}
                                    className="input resize-y"
                                />
                            </Field>
                            <button type="submit" disabled={processing} className="btn-gold disabled:opacity-60 w-full">
                                {processing ? t(locale, 'form_sending') : t(locale, 'form_send')}
                            </button>
                            {recaptchaSiteKey && (
                                <p className="text-[10px] text-charcoal/50 mt-2">
                                    Protected by reCAPTCHA. Google{' '}
                                    <a href="https://policies.google.com/privacy" className="underline">Privacy</a> &{' '}
                                    <a href="https://policies.google.com/terms" className="underline">Terms</a>.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-charcoal/80 mb-1 block">{label}</span>
            {children}
            {error && <span className="text-xs text-red-600 mt-1 block">{error}</span>}
        </label>
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
