<?php

namespace App\Http\Controllers;

use App\Mail\ContactSubmissionMail;
use App\Models\ContactSubmission;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact', [
            'page' => Page::where('slug', 'contact')->first(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string|max:5000',
            'recaptcha_token' => 'nullable|string',
        ]);

        $secret = Setting::map()['recaptcha_secret_key']['en'] ?? null;
        if ($secret && ! empty($data['recaptcha_token'])) {
            try {
                $resp = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                    'secret' => $secret,
                    'response' => $data['recaptcha_token'],
                ])->json();
                if (! ($resp['success'] ?? false) || ($resp['score'] ?? 0) < 0.3) {
                    return back()->withErrors(['recaptcha' => 'reCAPTCHA verification failed']);
                }
            } catch (\Throwable $e) {
                Log::warning('reCAPTCHA verify failed: '.$e->getMessage());
            }
        }

        $submission = ContactSubmission::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'message' => $data['message'],
            'ip' => $request->ip(),
        ]);

        $recipient = Setting::map()['email_recipient']['en'] ?? null;
        if ($recipient && config('mail.default') !== 'log') {
            try {
                Mail::to($recipient)->send(new ContactSubmissionMail($submission));
            } catch (\Throwable $e) {
                Log::warning('Contact email send failed: '.$e->getMessage());
            }
        }

        return back()->with('success', app()->getLocale() === 'hy'
            ? 'Ձեր հաղորդագրությունն ուղարկվեց։ Մենք շուտով կպատասխանենք։'
            : 'Your message has been sent. We will reply soon.');
    }
}
