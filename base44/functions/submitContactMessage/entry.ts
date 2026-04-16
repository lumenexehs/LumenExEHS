import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { name, email, company, phone, service_interest, message } = payload;

    if (!email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save using service role so unauthenticated visitors can submit
    await base44.asServiceRole.entities.ContactMessage.create({
      name, email, company, phone, service_interest, message, status: 'new'
    });

    // Send email notification
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'info@lumenexehs.ca',
      subject: `New enquiry from website — ${name || email}`,
      body: `Name: ${name || '—'}\nEmail: ${email}\nPhone: ${phone || '—'}\nCompany: ${company || '—'}\nService Interest: ${service_interest || '—'}\n\nMessage:\n${message}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});