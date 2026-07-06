// import { Resend } from 'resend';
// import { NextRequest, NextResponse } from 'next/server';

// const resend = new Resend(process.env.RESEND_API_KEY);
// // Inside the API route, before sending email
// const contentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`);
// const data = await contentRes.json();
// // const contactEmail = data.find((item: any) => item.sectionKey === 'contactEmail')?.value;

// // Then use it as the `to` address


// export async function POST(request: NextRequest) {
//   try {
//     const { name, email, message } = await request.json();

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: 'All fields are required.' },
//         { status: 400 }
//       );
//     }
    

//     // Send to the client email defined in .env.local
//     const { data, error } = await resend.emails.send({
//       from: 'Contact Form <onboarding@resend.dev>', // Replace with your verified domain later
//     //   to: [process.env.CONTACT_EMAIL || 'your-fallback@example.com'],
//     to:'mdanas7447@gmail.com',
//         // to: [contactEmail || process.env.CONTACT_EMAIL],
//       subject: `New Contact from ${name}`,
//     //   reply_to: email,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message.replace(/\n/g, '<br />')}</p>
//       `,
//     });

//     if (error) {
//       console.error('Resend error:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { error: 'Failed to send message.' },
//       { status: 500 }
//     );
//   }
// }




import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';


const resend = new Resend(process.env.RESEND_API_KEY);
const contentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`);

const data = await contentRes.json();
const contactEmail = data.find((item: any) => item.sectionKey === 'contactEmail')?.value;


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
    //   to: [contactEmail], //after verifying domain, we can use custom email.
    to:'mdanas7447@gmail.com',
      subject: `New Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}