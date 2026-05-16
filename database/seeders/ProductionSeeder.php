<?php

namespace Database\Seeders;

use App\Models\ContactSubmission;
use App\Models\Director;
use App\Models\Page;
use App\Models\Service;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProductionSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedAdmin();
        $this->seedPages();
        $this->seedServices();
        $this->seedDirector();
        $this->seedSettings();
    }

    private function seedAdmin(): void
    {
        if (User::count() > 0) {
            return;
        }

        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (! $email || ! $password) {
            return;
        }

        User::create([
            'name' => 'Admin',
            'email' => $email,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
        ]);
    }

    private function seedPages(): void
    {
        Page::firstOrCreate(['slug' => 'home'], [
            'title_hy' => 'Գլխավոր էջ',
            'title_en' => 'Home', // TODO: client to refine translation
            'body_hy' => "«Սիմոնյան և որդիներ» փաստաբանական ընկերությունը Ձեր վստահելի գործընկերն է Երևանում՝ երբ անհրաժեշտ է արագ և արդյունավետ իրավական պաշտպանություն։ Մենք հանդես ենք գալիս որպես արդյունքներին ուղղված փաստաբանական թիմ՝ պաշտպանելով մեր հաճախորդների իրավունքներն ու օրինական շահերը քրեական, քաղաքացիական և վարչական գործերով։\n\nԵթե կանգնած եք իրավական խնդրի առաջ, որտեղ սխալ քայլը կարող է թանկ արժենալ, մեր փորձառու փաստաբանները պատրաստ են կանգնել Ձեր կողքին՝ առաջին իսկ պահից։",
            'body_en' => "Simonyan and Sons Law Firm is your trusted partner in Yerevan when you need fast and effective legal protection. We act as a results-oriented legal team, defending our clients' rights and lawful interests in criminal, civil, and administrative matters.\n\nIf you face a legal issue where one wrong step can be costly, our experienced attorneys are ready to stand beside you from the very first moment.", // TODO: client to refine translation
            'meta_title_hy' => 'Սիմոնյան և որդիներ - Փաստաբանական ընկերություն Երևանում',
            'meta_title_en' => 'Simonyan and Sons - Law Firm in Yerevan', // TODO: client to refine translation
            'meta_description_hy' => 'Փաստաբանական ընկերություն Երևանում, որը մատուցում է իրավական ծառայություններ քրեական, քաղաքացիական, վարչական և կորպորատիվ գործերով:',
            'meta_description_en' => 'Law firm in Yerevan providing legal services in criminal, civil, administrative, and corporate matters.', // TODO: client to refine translation
        ]);

        Page::firstOrCreate(['slug' => 'about'], [
            'title_hy' => 'Մեր մասին',
            'title_en' => 'About Us', // TODO: client to refine translation
            'body_hy' => "«Սիմոնյան և որդիներ» փաստաբանական ընկերությունը ստեղծվել է մեկ հստակ նպատակի շուրջ՝ ապահովել մարդու իրավունքների իրական և արդյունավետ պաշտպանություն։ Մենք չենք առաջարկում ձևական լուծումներ․ մենք մշակում ենք գործնական, իրավաչափ և արդյունք ապահովող ռազմավարություններ։\n\nՄեր թիմը համադրում է փորձառու փաստաբանների տարիներով ձևավորված պրակտիկան և երիտասարդ իրավաբանների ժամանակակից, գիտահեն մոտեցումը։ Այդ համադրությունն է, որ մեզ դարձնում է ուժեղ մրցակից ցանկացած իրավական գործընթացում։\n\nՄենք համագործակցում ենք իրավաբան գիտնականների և ոլորտային փորձագետների հետ, որպեսզի նույնիսկ ամենաբարդ գործերը ստանան լիարժեք իրավական գնահատում։",
            'body_en' => "Simonyan and Sons Law Firm was founded around a single clear goal: to ensure genuine and effective protection of human rights. We do not offer formal solutions; we develop practical, lawful, and result-driven strategies.\n\nOur team combines the years of practice of experienced attorneys with the modern, science-based approach of young lawyers. It is this combination that makes us a strong competitor in any legal proceeding.\n\nWe cooperate with legal scholars and industry experts so that even the most complex cases receive a thorough legal assessment.", // TODO: client to refine translation
        ]);

        Page::firstOrCreate(['slug' => 'director'], [
            'title_hy' => 'Տնօրեն',
            'title_en' => 'Director', // TODO: client to refine translation
        ]);

        Page::firstOrCreate(['slug' => 'contact'], [
            'title_hy' => 'Կապ մեզ հետ',
            'title_en' => 'Contact Us', // TODO: client to refine translation
            'body_hy' => "Եթե Ձեզ անհրաժեշտ է փաստաբան Երևանում, որը ոչ միայն գիտի օրենքը, այլ նաև պաշտպանում է մինչև վերջ, կապվեք մեզ հետ։",
            'body_en' => "If you need an attorney in Yerevan who not only knows the law but also defends you to the end — contact us.", // TODO: client to refine translation
        ]);

        Page::firstOrCreate(['slug' => 'services'], [
            'title_hy' => 'Ծառայություններ',
            'title_en' => 'Services', // TODO: client to refine translation
            'body_hy' => "Մենք մատուցում ենք փաստաբանական ծառայություններ այն դեպքերում, երբ անհրաժեշտ է ոչ թե պարզապես իրավաբան, այլ վստահելի պաշտպան և ռազմավար։",
            'body_en' => "We provide legal services in cases where you need not just a lawyer but a trusted defender and strategist.", // TODO: client to refine translation
        ]);
    }

    private function seedServices(): void
    {
        $services = [
            [
                'slug' => 'criminal-cases',
                'icon' => 'gavel',
                'sort_order' => 1,
                'title_hy' => 'Քրեական գործեր',
                'title_en' => 'Criminal Cases', // TODO: client to refine translation
                'body_hy' => "Քրեական վարույթում յուրաքանչյուր րոպեն կարող է վճռորոշ լինել։ Մենք իրականացնում ենք ակտիվ և հստակ պաշտպանություն քրեական գործերով՝ սկսած ձերբակալման պահից մինչև դատական վերջնական ակտը։\n\nՄեր փաստաբանները մշակում են պաշտպանական ռազմավարություն, որի նպատակն է նվազեցնել ռիսկերը, կանխել ապօրինի գործողությունները և ապահովել Ձեր իրավունքների լիարժեք պաշտպանությունը։\n\nԾառայությունները ներառում են՝\n• Պաշտպանություն նախաքննության փուլում\n• Ներկայացուցչություն բոլոր ատյանների դատարաններում\n• Խափանման միջոցների բողոքարկում\n• Միջնորդությունների և բողոքների կազմում",
                'body_en' => "In criminal proceedings, every minute can be decisive. We provide active, clear-cut defense in criminal cases — from the moment of arrest to the final judicial act.\n\nOur attorneys develop a defense strategy aimed at minimizing risks, preventing unlawful actions, and ensuring full protection of your rights.\n\nServices include:\n• Defense at the pre-trial stage\n• Representation in courts of all instances\n• Appealing preventive measures\n• Drafting motions and complaints", // TODO: client to refine translation
            ],
            [
                'slug' => 'civil-cases',
                'icon' => 'scale',
                'sort_order' => 2,
                'title_hy' => 'Քաղաքացիական գործեր',
                'title_en' => 'Civil Cases', // TODO: client to refine translation
                'body_hy' => "Գույքային և ոչ գույքային վեճերը պահանջում են հաշվարկված և իրավաբանորեն ճշգրիտ մոտեցում։ Մենք պաշտպանում ենք մեր հաճախորդների շահերը քաղաքացիական գործերով՝ ապահովելով թե՛ դատական, թե՛ արտադատական արդյունավետ լուծումներ։\n\nՄեր նպատակը պարզ է՝ պաշտպանել Ձեր իրավունքները և հասնել առավել շահավետ արդյունքի։",
                'body_en' => "Property and non-property disputes require a calculated and legally precise approach. We defend our clients' interests in civil cases, providing effective judicial and out-of-court solutions.\n\nOur goal is simple: to defend your rights and achieve the most favorable outcome.", // TODO: client to refine translation
            ],
            [
                'slug' => 'administrative-cases',
                'icon' => 'building',
                'sort_order' => 3,
                'title_hy' => 'Վարչական գործեր',
                'title_en' => 'Administrative Cases', // TODO: client to refine translation
                'body_hy' => "Վարչական մարմինների կայացրած որոշումները կարող են լուրջ ազդեցություն ունենալ Ձեր կյանքի և բիզնեսի վրա։ Մենք իրականացնում ենք վարչական ակտերի բողոքարկում, ներկայացուցչություն վարչական մարմիններում և վարչական դատարանում՝ պաշտպանելով քաղաքացիների և կազմակերպությունների իրավունքները։",
                'body_en' => "Decisions made by administrative authorities can seriously affect your life and business. We appeal administrative acts and represent clients before administrative bodies and the administrative court, protecting the rights of citizens and organizations.", // TODO: client to refine translation
            ],
            [
                'slug' => 'corporate-law',
                'icon' => 'briefcase',
                'sort_order' => 4,
                'title_hy' => 'Կորպորատիվ իրավունք',
                'title_en' => 'Corporate Law', // TODO: client to refine translation
                'body_hy' => "Բիզնեսը պետք է զարգանա, ոչ թե խրվի իրավական խնդիրների մեջ։ Մենք ապահովում ենք ընկերությունների ամբողջական իրավական ուղեկցում՝ նվազեցնելով ռիսկերը և պաշտպանելով բիզնես շահերը։\n\nԾառայությունները ներառում են՝\n• Պայմանագրերի մշակում և իրավական վերլուծություն\n• Ընկերությունների իրավական ուղեկցում\n• Կորպորատիվ վեճերի լուծում և ներկայացուցչություն",
                'body_en' => "A business should grow, not get bogged down in legal problems. We provide comprehensive legal support for companies, minimizing risks and protecting business interests.\n\nServices include:\n• Drafting and analyzing contracts\n• Ongoing legal support for companies\n• Resolution and representation in corporate disputes", // TODO: client to refine translation
            ],
            [
                'slug' => 'legal-audit-consulting',
                'icon' => 'book',
                'sort_order' => 5,
                'title_hy' => 'Իրավական աուդիտ և խորհրդատվություն',
                'title_en' => 'Legal Audit & Consulting', // TODO: client to refine translation
                'body_hy' => "Իրավական խնդիրները կանխարգելելը միշտ ավելի արդյունավետ է, քան դրանց լուծումը։ Մենք իրականացնում ենք իրավական աուդիտ և տրամադրում ենք պրոֆեսիոնալ խորհրդատվություն՝ օգնելով մեր հաճախորդներին գործել անվտանգ և կանխատեսելի իրավական միջավայրում։",
                'body_en' => "Preventing legal problems is always more effective than resolving them. We conduct legal audits and provide professional consulting, helping our clients operate in a safe and predictable legal environment.", // TODO: client to refine translation
            ],
        ];

        foreach ($services as $s) {
            Service::firstOrCreate(['slug' => $s['slug']], $s);
        }
    }

    private function seedDirector(): void
    {
        Director::firstOrCreate(['id' => 1], [
            'full_name_hy' => 'Սիմոնյան',
            'full_name_en' => 'Simonyan', // TODO: client to refine translation
            'title_hy' => 'Հիմնադիր և գլխավոր փաստաբան',
            'title_en' => 'Founder and Managing Attorney', // TODO: client to refine translation
            'bio_hy' => 'Բազմամյա փորձով փաստաբան, ով նվիրված է իր հաճախորդների իրավունքների պաշտպանությանը։',
            'bio_en' => 'An attorney with many years of experience, dedicated to protecting the rights of his clients.', // TODO: client to refine translation
            'years_experience' => 20,
            'expertise_hy' => 'Քրեական իրավունք, քաղաքացիական իրավունք, վարչական իրավունք, կորպորատիվ իրավունք',
            'expertise_en' => 'Criminal law, civil law, administrative law, corporate law', // TODO: client to refine translation
        ]);
    }

    private function seedSettings(): void
    {
        $settings = [
            ['key' => 'phone', 'value_hy' => '+374 00 000 000', 'value_en' => '+374 00 000 000'],
            ['key' => 'email', 'value_hy' => 'info@simonyanslawfirm.am', 'value_en' => 'info@simonyanslawfirm.am'],
            ['key' => 'email_recipient', 'value_hy' => 'info@simonyanslawfirm.am', 'value_en' => 'info@simonyanslawfirm.am'],
            ['key' => 'address_hy', 'value_hy' => 'ք. Երևան, Մաշտոց 33/1', 'value_en' => null],
            ['key' => 'address_en', 'value_hy' => null, 'value_en' => 'Mashtots 33/1, Yerevan'], // TODO: client to refine translation
            ['key' => 'working_hours_hy', 'value_hy' => 'Երկ-Ուրբ: 09:00 - 18:00', 'value_en' => null],
            ['key' => 'working_hours_en', 'value_hy' => null, 'value_en' => 'Mon-Fri: 09:00 - 18:00'],
            ['key' => 'facebook_url', 'value_hy' => 'https://www.facebook.com/', 'value_en' => 'https://www.facebook.com/'],
            ['key' => 'google_maps_embed', 'value_hy' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2!2d44.5!3d40.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2sMashtots%2033%2F1!5e0!3m2!1sen!2sam!4v1700000000000', 'value_en' => null],
            ['key' => 'logo_path', 'value_hy' => '/assets/logo.png', 'value_en' => '/assets/logo.png'],
            ['key' => 'recaptcha_site_key', 'value_hy' => '', 'value_en' => ''],
            ['key' => 'recaptcha_secret_key', 'value_hy' => '', 'value_en' => ''],
        ];

        foreach ($settings as $s) {
            Setting::firstOrCreate(['key' => $s['key']], $s);
        }
    }
}
