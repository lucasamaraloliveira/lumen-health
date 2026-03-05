import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios.' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Lumen Health <onboarding@resend.dev>', // Use sua conta verificada no Resend em produção
            to: ['contato@lumenhealth.com.br'], // Email para onde as mensagens serão enviadas
            subject: `Novo Contato: ${subject}`,
            replyTo: email,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0f172a;">Nova mensagem do formulário de contato</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <p><strong>Mensagem:</strong></p>
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="font-size: 12px; color: #64748b;">Este email foi enviado via Lumen Health Contact Form.</p>
        </div>
      `,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno ao enviar o email.' }, { status: 500 });
    }
}
