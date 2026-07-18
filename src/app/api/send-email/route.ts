import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = 'ailurastudio1616@gmail.com'

function detectCarrier(trackingId: string): { name: string; url: string | null } | null {
  if (!trackingId) return null
  const id = trackingId.trim()

  if (/^\d{12}$/.test(id) || /^\d{15}$/.test(id) || /^\d{20}$/.test(id)) {
    return { name: 'FedEx', url: `https://www.fedex.com/fedextrack/?trknbr=${id}` }
  }
  if (/^[A-Z]{3}\d+$/i.test(id)) {
    return { name: 'Delhivery', url: `https://www.delhivery.com/track/package/${id}` }
  }
  if (/^\d{11}$/.test(id)) {
    return { name: 'BlueDart', url: `https://www.bluedart.com/tracking?trackFor=0&field1=${id}` }
  }
  if (/^[A-Z]\d{8,10}$/i.test(id)) {
    return { name: 'DTDC', url: `https://www.dtdc.in/tracking.asp?txconsignmentnox=${id}` }
  }
  if (/^[A-Z]{2}\d{9}[A-Z]{2}$/.test(id)) {
    return { name: 'India Post', url: `https://www.indiapost.gov.in/track/home/${id}` }
  }

  return { name: 'Courier', url: null }
}

// ── Services array ko display ke liye format karo — naye "services" array ya purane "service" field dono handle karta hai ──
function formatServices(appointment: any): string {
  if (Array.isArray(appointment.services) && appointment.services.length > 0) {
    return appointment.services.join(', ')
  }
  return appointment.service || '—'
}

// ── Services ko HTML list (bullet points) ke tarike mein render karo, jab multiple ho ──
function formatServicesHTML(appointment: any): string {
  if (Array.isArray(appointment.services) && appointment.services.length > 0) {
    if (appointment.services.length === 1) return appointment.services[0]
    return appointment.services
      .map((s: string) => `<span style="display:inline-block;background:#F8F5F0;border:1px solid #E8DED3;padding:3px 10px;margin:2px 4px 2px 0;font-size:11px;color:#111;">${s}</span>`)
      .join('')
  }
  return appointment.service || '—'
}

// ── Rate limiting — IP pe max 5 requests/min ──
const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const { type, order, customerEmail, customerName, appointment } = await req.json()

    // ── ORDER PLACED: customer + admin ──
    if (type === 'order_placed') {
      await resend.emails.send({
        from: 'AILURA <orders@ailurastudio.com>',
        to: customerEmail,
        replyTo: ADMIN_EMAIL,
        subject: `Order Confirmed — #${order.id} | AILURA`,
        html: orderPlacedTemplate(order, customerName),
      })

      await resend.emails.send({
        from: 'AILURA <orders@ailurastudio.com>',
        to: ADMIN_EMAIL,
        subject: `🛍️ New Order #${order.id} — ₹${order.total_amount}`,
        html: adminOrderTemplate(order),
      })
    }

    // ── ORDER UPDATED: customer only ──
    if (type === 'order_updated') {
      await resend.emails.send({
        from: 'AILURA <orders@ailurastudio.com>',
        to: customerEmail,
        replyTo: ADMIN_EMAIL,
        subject: `Order Update — #${order.id} is now ${order.order_status} | AILURA`,
        html: orderUpdatedTemplate(order, customerName),
      })
    }

    // ── APPOINTMENT PLACED: customer + admin ──
    if (type === 'appointment_placed') {
      await resend.emails.send({
        from: 'AILURA <orders@ailurastudio.com>',
        to: appointment.email,
        replyTo: ADMIN_EMAIL,
        subject: `Appointment Request Received | AILURA`,
        html: appointmentCustomerTemplate(appointment),
      })

      await resend.emails.send({
        from: 'AILURA <orders@ailurastudio.com>',
        to: ADMIN_EMAIL,
        subject: `New Appointment — ${appointment.full_name} | ${formatServices(appointment)}`,
        html: adminAppointmentTemplate(appointment),
      })
    }

    // ── APPOINTMENT UPDATED: customer only ──
    if (type === 'appointment_updated') {
      await resend.emails.send({
        from: 'AILURA <orders@ailurastudio.com>',
        to: appointment.email,
        replyTo: ADMIN_EMAIL,
        subject: `Appointment ${appointment.status} | AILURA`,
        html: appointmentUpdatedTemplate(appointment),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

const headerHTML = `
  <tr>
    <td style="background:#0E0B07;padding:48px 40px 40px;text-align:center;">
      <p style="margin:0;font-size:28px;letter-spacing:18px;color:#C9A86A;text-transform:uppercase;font-family:Georgia,serif;font-weight:300;">AILURA</p>
      <div style="width:40px;height:1px;background:#C9A86A55;margin:14px auto;"></div>
      <p style="margin:0;font-size:9px;letter-spacing:6px;color:rgba(255,255,255,0.3);text-transform:uppercase;font-family:Georgia,serif;">Luxury Nail Studio</p>
    </td>
  </tr>
  <tr>
    <td style="height:2px;background:linear-gradient(to right,transparent,#C9A86A,transparent);"></td>
  </tr>
`

const footerHTML = `
  <tr>
    <td style="background:#0E0B07;padding:24px 40px;text-align:center;border-top:1px solid #C9A86A22;">
      <p style="margin:0 0 6px;font-size:9px;letter-spacing:4px;color:rgba(255,255,255,0.25);text-transform:uppercase;">© 2026 AILURA. All rights reserved.</p>
      <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.2);">ailurastudio.com</p>
    </td>
  </tr>
`

function orderPlacedTemplate(order: any, name: string) {
  return `
<!DOCTYPE html><html><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border:1px solid #E8DED3;">
  ${headerHTML}
  <tr><td style="padding:40px;background:#FDFCF9;">
    <p style="margin:0 0 6px;font-size:9px;letter-spacing:4px;color:#C9A86A;text-transform:uppercase;">Order Confirmed</p>
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:300;color:#111;line-height:1.3;">Thank you, ${name}.</h1>
    <p style="margin:0 0 28px;font-size:13px;line-height:1.9;color:rgba(0,0,0,0.55);">
      Your order has been received and is being carefully prepared by our atelier team. We will notify you as soon as it ships.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border:1px solid #E8DED3;margin-bottom:28px;">
      <tr>
        <td style="padding:20px 24px;"><p style="margin:0 0 4px;font-size:9px;letter-spacing:4px;color:#C9A86A;text-transform:uppercase;">Order Number</p><p style="margin:0;font-size:22px;font-weight:300;color:#111;">#${order.id}</p></td>
        <td style="padding:20px 24px;text-align:right;"><p style="margin:0 0 4px;font-size:9px;letter-spacing:4px;color:rgba(0,0,0,0.35);text-transform:uppercase;">Status</p><p style="margin:0;font-size:11px;color:#C9A86A;text-transform:uppercase;letter-spacing:2px;">${order.order_status}</p></td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-top:1px solid #E8DED3;border-bottom:1px solid #E8DED3;padding:16px 0;">
      <tr><td style="padding:5px 0;font-size:12px;color:rgba(0,0,0,0.5);">Subtotal</td><td style="padding:5px 0;font-size:12px;color:rgba(0,0,0,0.5);text-align:right;">₹${order.subtotal}</td></tr>
      ${order.discount_amount > 0 ? `<tr><td style="padding:5px 0;font-size:12px;color:#16a34a;">Discount</td><td style="padding:5px 0;font-size:12px;color:#16a34a;text-align:right;">− ₹${order.discount_amount}</td></tr>` : ''}
      <tr><td style="padding:5px 0;font-size:12px;color:rgba(0,0,0,0.5);">Shipping</td><td style="padding:5px 0;font-size:12px;color:rgba(0,0,0,0.5);text-align:right;">Complimentary</td></tr>
      <tr><td style="padding:14px 0 5px;font-size:9px;letter-spacing:3px;color:rgba(0,0,0,0.4);text-transform:uppercase;border-top:1px solid #E8DED3;">Total</td><td style="padding:14px 0 5px;font-size:20px;font-weight:300;color:#111;text-align:right;border-top:1px solid #E8DED3;">₹${order.total_amount}</td></tr>
    </table>
    <p style="margin:0 0 6px;font-size:9px;letter-spacing:4px;color:#C9A86A;text-transform:uppercase;">Shipping To</p>
    <p style="margin:0 0 28px;font-size:13px;line-height:1.8;color:rgba(0,0,0,0.6);">${order.customer_name}<br/>${order.shipping_address}</p>
    <p style="margin:0;font-size:12px;line-height:1.9;color:rgba(0,0,0,0.45);">
      For any queries, reply to this email or write to <a href="mailto:ailurastudio1616@gmail.com" style="color:#C9A86A;text-decoration:none;">ailurastudio1616@gmail.com</a>
    </p>
  </td></tr>
  ${footerHTML}
</table>
</td></tr></table>
</body></html>`
}

function orderUpdatedTemplate(order: any, name: string) {
  const statusMessages: Record<string, string> = {
    processing: 'Your order is being carefully prepared by our atelier team.',
    shipped: 'Great news! Your order is on its way to you.',
    delivered: 'Your order has been delivered. We hope you love it!',
    cancelled: 'Your order has been cancelled. Please contact us if you have any questions.',
  }
  const message = statusMessages[order.order_status?.toLowerCase()] || 'Your order status has been updated.'
  const carrier = order.tracking_id ? detectCarrier(order.tracking_id) : null

  const trackingBlock = order.tracking_id ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border:1px solid #C9A86A33;margin-bottom:28px;">
      <tr><td style="padding:16px 24px;">
        <p style="margin:0 0 4px;font-size:9px;letter-spacing:4px;color:#C9A86A;text-transform:uppercase;">Tracking</p>
        <p style="margin:0 0 12px;font-size:15px;font-weight:300;color:#111;">${order.tracking_id}${carrier ? `<span style="font-size:11px;color:rgba(0,0,0,0.4);margin-left:8px;">(${carrier.name})</span>` : ''}</p>
        ${carrier?.url ? `<a href="${carrier.url}" style="display:inline-block;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#0E0B07;background:#C9A86A;padding:9px 20px;text-decoration:none;">Track Your Order →</a>` : ''}
      </td></tr>
    </table>` : ''

  return `
<!DOCTYPE html><html><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border:1px solid #E8DED3;">
  ${headerHTML}
  <tr><td style="padding:40px;background:#FDFCF9;">
    <p style="margin:0 0 6px;font-size:9px;letter-spacing:4px;color:#C9A86A;text-transform:uppercase;">Order Update</p>
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:300;color:#111;line-height:1.3;">Your order is <em style="font-style:italic;color:#C9A86A;">${order.order_status}</em>.</h1>
    <p style="margin:0 0 28px;font-size:13px;line-height:1.9;color:rgba(0,0,0,0.55);">Hi ${name}, ${message}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border:1px solid #E8DED3;margin-bottom:28px;">
      <tr>
        <td style="padding:20px 24px;"><p style="margin:0 0 4px;font-size:9px;letter-spacing:4px;color:#C9A86A;text-transform:uppercase;">Order Number</p><p style="margin:0;font-size:22px;font-weight:300;color:#111;">#${order.id}</p></td>
        <td style="padding:20px 24px;text-align:right;"><p style="margin:0 0 4px;font-size:9px;letter-spacing:4px;color:rgba(0,0,0,0.35);text-transform:uppercase;">New Status</p><p style="margin:0;font-size:11px;color:#C9A86A;text-transform:uppercase;letter-spacing:2px;">${order.order_status}</p></td>
      </tr>
    </table>
    ${trackingBlock}
    <p style="margin:0;font-size:12px;line-height:1.9;color:rgba(0,0,0,0.45);">
      For any queries, reply to this email or write to <a href="mailto:ailurastudio1616@gmail.com" style="color:#C9A86A;text-decoration:none;">ailurastudio1616@gmail.com</a>
    </p>
  </td></tr>
  ${footerHTML}
</table>
</td></tr></table>
</body></html>`
}

function adminOrderTemplate(order: any) {
  return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;background:#fff;border:1px solid #e0e0e0;">
  <tr><td style="background:#0E0B07;padding:24px 32px;">
    <p style="margin:0;font-size:10px;letter-spacing:8px;color:#C9A86A;text-transform:uppercase;">A I L U R A · ADMIN</p>
    <h2 style="margin:8px 0 0;font-size:20px;font-weight:400;color:#fff;">New Order Received 🛍️</h2>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border:1px solid #E8DED3;margin-bottom:20px;">
      <tr>
        <td style="padding:16px 20px;"><p style="margin:0 0 2px;font-size:9px;color:#C9A86A;text-transform:uppercase;letter-spacing:3px;">Order ID</p><p style="margin:0;font-size:18px;font-weight:300;color:#111;">#${order.id}</p></td>
        <td style="padding:16px 20px;text-align:right;"><p style="margin:0 0 2px;font-size:9px;color:#888;text-transform:uppercase;letter-spacing:3px;">Total</p><p style="margin:0;font-size:22px;font-weight:600;color:#C9A86A;">₹${order.total_amount}</p></td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr><td style="padding:6px 0;font-size:12px;color:#555;border-bottom:1px solid #f0f0f0;"><strong>Customer:</strong> ${order.customer_name}</td></tr>
      <tr><td style="padding:6px 0;font-size:12px;color:#555;border-bottom:1px solid #f0f0f0;"><strong>Email:</strong> ${order.customer_email || '-'}</td></tr>
      <tr><td style="padding:6px 0;font-size:12px;color:#555;border-bottom:1px solid #f0f0f0;"><strong>Phone:</strong> ${order.customer_phone || '-'}</td></tr>
      <tr><td style="padding:6px 0;font-size:12px;color:#555;"><strong>Address:</strong> ${order.shipping_address}</td></tr>
    </table>
    <a href="https://ailurastudio.com/admin/orders" style="display:inline-block;background:#C9A86A;color:#fff;padding:12px 24px;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;">View Order →</a>
  </td></tr>
</table>
</td></tr></table>
</body></html>`
}

function adminAppointmentTemplate(appointment: any) {
  return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;background:#fff;border:1px solid #e0e0e0;">
  <tr><td style="background:#0E0B07;padding:24px 32px;">
    <p style="margin:0;font-size:10px;letter-spacing:8px;color:#C9A86A;text-transform:uppercase;">A I L U R A · ADMIN</p>
    <h2 style="margin:8px 0 0;font-size:20px;font-weight:400;color:#fff;">New Appointment Request</h2>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border:1px solid #E8DED3;margin-bottom:20px;">
      <tr>
        <td style="padding:16px 20px;" colspan="2">
          <p style="margin:0 0 6px;font-size:9px;color:#C9A86A;text-transform:uppercase;letter-spacing:3px;">Services (${Array.isArray(appointment.services) ? appointment.services.length : 1})</p>
          <div style="line-height:2;">${formatServicesHTML(appointment)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;border-top:1px solid #E8DED3;"><p style="margin:0 0 2px;font-size:9px;color:#888;text-transform:uppercase;letter-spacing:3px;">Date & Time</p><p style="margin:0;font-size:13px;color:#C9A86A;">${appointment.appointment_date} · ${appointment.appointment_time}</p></td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr><td style="padding:6px 0;font-size:12px;color:#555;border-bottom:1px solid #f0f0f0;"><strong>Name:</strong> ${appointment.full_name}</td></tr>
      <tr><td style="padding:6px 0;font-size:12px;color:#555;border-bottom:1px solid #f0f0f0;"><strong>Email:</strong> ${appointment.email}</td></tr>
      <tr><td style="padding:6px 0;font-size:12px;color:#555;border-bottom:1px solid #f0f0f0;"><strong>Phone:</strong> ${appointment.phone}</td></tr>
      ${appointment.notes ? `<tr><td style="padding:6px 0;font-size:12px;color:#555;"><strong>Notes:</strong> ${appointment.notes}</td></tr>` : ''}
    </table>
    <a href="https://ailurastudio.com/admin/appointments" style="display:inline-block;background:#C9A86A;color:#fff;padding:12px 24px;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;">View Appointment →</a>
  </td></tr>
</table>
</td></tr></table>
</body></html>`
}

function appointmentCustomerTemplate(appointment: any) {
  return `
<!DOCTYPE html><html><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#fff;border:1px solid #E8DED3;">
  ${headerHTML}
  <tr><td style="padding:40px;background:#FDFCF9;">
    <p style="margin:0 0 6px;font-size:9px;letter-spacing:4px;color:#C9A86A;text-transform:uppercase;">Appointment Received</p>
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:300;color:#111;">Thank you, ${appointment.full_name}.</h1>
    <p style="margin:0 0 28px;font-size:13px;line-height:1.9;color:rgba(0,0,0,0.55);">
      Your appointment request has been received. Our team will confirm your booking within 24 hours.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border:1px solid #E8DED3;margin-bottom:28px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 6px;font-size:9px;color:#C9A86A;text-transform:uppercase;letter-spacing:3px;">Services</p>
          <div style="line-height:2;">${formatServicesHTML(appointment)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;border-top:1px solid #E8DED3;">
          <p style="margin:0 0 2px;font-size:9px;color:#888;text-transform:uppercase;letter-spacing:3px;">Date & Time</p>
          <p style="margin:0;font-size:13px;color:#C9A86A;">${appointment.appointment_date} · ${appointment.appointment_time}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:12px;line-height:1.9;color:rgba(0,0,0,0.45);">
      Questions? Contact us at <a href="mailto:ailurastudio1616@gmail.com" style="color:#C9A86A;text-decoration:none;">ailurastudio1616@gmail.com</a>
    </p>
  </td></tr>
  ${footerHTML}
</table>
</td></tr></table>
</body></html>`
}

function appointmentUpdatedTemplate(appointment: any) {
  const statusMessages: Record<string, string> = {
    confirmed: 'Your appointment has been confirmed. We look forward to welcoming you.',
    completed: 'Thank you for visiting AILURA! We hope you loved your experience.',
    cancelled: 'Your appointment has been cancelled. Please contact us to reschedule.',
  }
  const message = statusMessages[appointment.status?.toLowerCase()] || 'Your appointment status has been updated.'

  return `
<!DOCTYPE html><html><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#fff;border:1px solid #E8DED3;">
  ${headerHTML}
  <tr><td style="padding:40px;background:#FDFCF9;">
    <p style="margin:0 0 6px;font-size:9px;letter-spacing:4px;color:#C9A86A;text-transform:uppercase;">Appointment Update</p>
    <h1 style="margin:0 0 20px;font-size:26px;font-weight:300;color:#111;">Your appointment is <em style="font-style:italic;color:#C9A86A;">${appointment.status}</em>.</h1>
    <p style="margin:0 0 28px;font-size:13px;line-height:1.9;color:rgba(0,0,0,0.55);">Hi ${appointment.full_name}, ${message}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border:1px solid #E8DED3;margin-bottom:28px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 6px;font-size:9px;color:#C9A86A;text-transform:uppercase;letter-spacing:3px;">Services</p>
          <div style="line-height:2;">${formatServicesHTML(appointment)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;border-top:1px solid #E8DED3;">
          <p style="margin:0 0 2px;font-size:9px;color:#888;text-transform:uppercase;letter-spacing:3px;">Date & Time</p>
          <p style="margin:0;font-size:13px;color:#C9A86A;">${appointment.appointment_date} · ${appointment.appointment_time}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:12px;line-height:1.9;color:rgba(0,0,0,0.45);">
      Questions? Contact us at <a href="mailto:ailurastudio1616@gmail.com" style="color:#C9A86A;text-decoration:none;">ailurastudio1616@gmail.com</a>
    </p>
  </td></tr>
  ${footerHTML}
</table>
</td></tr></table>
</body></html>`
}