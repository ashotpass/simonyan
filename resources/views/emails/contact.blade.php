<!doctype html>
<html>
<body>
<h2>New contact submission</h2>
<p><strong>Name:</strong> {{ $s->name }}</p>
<p><strong>Email:</strong> {{ $s->email }}</p>
<p><strong>Phone:</strong> {{ $s->phone ?? '-' }}</p>
<p><strong>IP:</strong> {{ $s->ip }}</p>
<p><strong>Message:</strong></p>
<p>{!! nl2br(e($s->message)) !!}</p>
</body>
</html>
