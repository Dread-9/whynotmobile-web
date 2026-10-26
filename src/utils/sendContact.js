import emailjs from '@emailjs/browser'

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'f3J0Fv7DkX-KrgCro'
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_r21rk2u'
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_u9fyp5t'

export async function sendContactEmail({ name, email, message, plan = '', phone = '', detail_custom = '' }) {
  const detail = [phone && `Teléfono: ${phone}`, message].filter(Boolean).join('\n\n')

  await emailjs.send(
    serviceId,
    templateId,
    {
      plan_select: plan || 'WhyNot Mobile',
      detail_custom: detail_custom || 'App Ionic / Angular / Capacitor',
      name,
      email,
      message: detail,
      subject: `WhyNot Mobile | ${name || 'Contacto'}`,
    },
    { publicKey },
  )
}
