const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const row = (label, value) => `
  <tr>
    <td style="padding:10px 0 4px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#7C3AED;font-weight:800;">${escapeHtml(label)}</td>
  </tr>
  <tr>
    <td style="padding:0 0 14px;font-size:15px;line-height:1.5;color:#1C1917;border-bottom:1px solid #EDE9FE;">${escapeHtml(value || '—').replace(/\n/g, '<br>')}</td>
  </tr>
`

export const buildContactHtml = ({
  name,
  email,
  phone,
  plan,
  detail,
  message,
}) => `
<!DOCTYPE html>
<html lang="es">
  <body style="margin:0;padding:0;background:#F6F4FF;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F4FF;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#120c1c;border-radius:16px 16px 0 0;">
            <tr>
              <td style="padding:28px 32px 22px;text-align:center;">
                <img src="https://raw.githubusercontent.com/Dread-9/whynotmobile-web/main/public/logo/wnm-badge.png" alt="WhyNot Mobile" width="72" height="72" style="display:block;margin:0 auto 16px;border-radius:999px;">
                <p style="margin:0;color:#ffffff;font-size:20px;font-weight:800;letter-spacing:0.04em;">WHYNOT MOBILE</p>
                <p style="margin:8px 0 0;color:#C4B5FD;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Apps Ionic · Angular · Capacitor</p>
              </td>
            </tr>
            <tr>
              <td style="height:6px;background:#7C3AED;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
          </table>
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;padding:28px 32px;">
            <tr>
              <td>
                <p style="margin:0 0 6px;color:#7C3AED;font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;">Nueva cotización</p>
                <h1 style="margin:0 0 22px;font-size:26px;line-height:1.2;color:#120c1c;">Solicitud desde WhyNot Mobile</h1>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row('Nombre', name)}
                  ${row('Email', email)}
                  ${row('Teléfono', phone)}
                  ${row('Plan', plan)}
                  ${row('Detalle', detail)}
                  ${row('Mensaje', message)}
                </table>
              </td>
            </tr>
          </table>
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#120c1c;border-radius:0 0 16px 16px;">
            <tr>
              <td style="padding:22px 32px;color:#C4B5FD;font-size:12px;line-height:1.7;">
                <strong style="color:#ffffff;">WhyNot Mobile</strong> · NexGen Technologies<br>
                Antonio Bellet 193, 1210 · Providencia, Chile<br>
                +56 9 5458 3715 · nexgentechnologies2024@gmail.com
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
