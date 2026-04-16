import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { type, name, email, phone, organization, occupation, social, message } = payload;

    if (!email || !type) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to entity using service role (works for unauthenticated users)
    await base44.asServiceRole.entities.BusinessCardLead.create({
      type, name, email, phone, organization, occupation, social, message, status: 'new'
    });

    // Send email notification
    const subjectName = name || email;
    const subject = type === 'enquiry'
      ? `New enquiry from business card — ${subjectName}`
      : `New contact from business card — ${subjectName}`;

    const body = type === 'enquiry'
      ? `Name: ${name || '—'}\nEmail: ${email}\n\nMessage:\n${message}`
      : `Name: ${name || '—'}\nEmail: ${email}\nPhone: ${phone || '—'}\nOrganization: ${organization || '—'}\nOccupation: ${occupation || '—'}\nSocial: ${social || '—'}`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'info@lumenexehs.ca',
      subject,
      body,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});