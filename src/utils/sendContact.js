import emailjs from '@emailjs/browser'

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'f3J0Fv7DkX-KrgCro'
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_r21rk2u'
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_f8zc02c'
const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL || 'nexgentechnologies2024@gmail.com'

export async function sendContactEmail({ name, email, message, plan = '', phone = '', detail_custom = '' }) {
  const detail = [phone && `Teléfono: ${phone}`, message].filter(Boolean).join('\n\n')
  const subject = `WhyNot Mobile | ${name || 'Contacto'}`

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: toEmail,
      to_name: 'WhyNot Mobile',
      from_name: name || 'Sitio web',
      from_email: email || toEmail,
      reply_to: email || toEmail,
      subject,
      plan_select: plan || 'WhyNot Mobile',
      detail_custom: detail_custom || 'App Ionic / Angular / Capacitor',
      name,
      email,
      message: detail,
      empresa: 'WhyNot Mobile',
      cargo: plan || '—',
      telefono: phone || '—',
      mensaje: detail || '—',
      message_html: `<p><strong>WhyNot Mobile</strong></p><p>Plan: ${plan || '—'}</p><p>${detail.replace(/\n/g, '<br>')}</p>`,
    },
    { publicKey },
  )
}
