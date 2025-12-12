// sendBookingPDFEmail.js
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const streamBuffers = require('stream-buffers');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendBookingPDFEmail(booking) {
  try {
    const recipientEmail = booking?.user_id?.email;
    if (!recipientEmail) {
      throw new Error('No recipient email provided');
    }

    // --- 1. Create PDF Document ---
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true
    });

    const outputStream = new streamBuffers.WritableStreamBuffer({
      initialSize: 100 * 1024,
      incrementAmount: 10 * 1024
    });

    doc.pipe(outputStream);

    // --- 2. Add content to PDF ---
    doc.font('Helvetica-Bold')
      .fontSize(20)
      .text('Booking Confirmation', { align: 'center' })
      .moveDown();

    doc.font('Helvetica')
      .fontSize(12)
      .text(`Movie: ${booking.showtime_id.movie_id.title}`)
      .text(`Showtime: ${new Date(booking.showtime_id.start_time).toLocaleString()}`)
      .text(`Screen: ${booking.screen_id.screenName}`)
      .text(`Seats: ${booking.seats.join(', ')}`)
      .text(`Total Amount: ${booking.total_amount} RS.`)
      .text(`Booking ID: ${booking.booking_reference}`)
      .moveDown();

    // --- 3. Generate and Embed QR Code ---
    try {
      const qrData = {
        movie: booking.showtime_id.movie_id.title,
        showtime: booking.showtime_id.start_time,
        screen: booking.screen_id.screenName,
        seats: booking.seats,
        amount: booking.total_amount,
        bookingId: booking.booking_reference
      };

      const qrDataUrl = await QRCode.toDataURL(JSON.stringify(qrData));
      const qrImage = Buffer.from(qrDataUrl.split(',')[1], 'base64');

      const qrSize = 120;
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      // Right-align QR inside margins
      const x = doc.page.margins.left + (pageWidth - qrSize);
      const y = doc.y;
      doc.image(qrImage, x, y, { width: qrSize, height: qrSize });

      // Move cursor below QR to avoid overlap
      doc.moveDown(6);
    } catch (err) {
      console.error('QR Code Error:', err);
    }

    // --- 4. Footer ---
    const footerText = 'Thank you for your booking!';
    const footerY = doc.page.height - 50; // position from bottom

    if (doc.y < footerY - 20) {
      doc.fontSize(10).text(footerText, {
        align: 'center',
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right
      });
    } else {
      doc.addPage();
      doc.fontSize(10).text(footerText, {
        align: 'center',
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right
      });
    }

    doc.end();

    // --- 5. Wait for PDF to finish writing ---
    await new Promise((resolve, reject) => {
      outputStream.on('finish', resolve);
      outputStream.on('error', reject);
    });

    const pdfBuffer = outputStream.getContents();
    if (!pdfBuffer) {
      throw new Error('Failed to generate PDF');
    }

    // --- 6. Send email via SendGrid (attachments must be base64) ---
    if (!process.env.EMAIL_USER) {
      throw new Error('EMAIL_USER is not set in environment variables');
    }

    const pdfBase64 = pdfBuffer.toString('base64');

    const msg = {
      to: recipientEmail,
      from: process.env.EMAIL_USER,
      subject: `Your Booking Confirmation - ${booking.booking_reference}`,
      text: `Dear customer,\n\nPlease find attached your booking details for ${booking.showtime_id.movie_id.title}.\n\nThank you for choosing us!`,
      attachments: [
        {
          content: pdfBase64,
          filename: `Booking_${booking.booking_reference}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };

    try {
      const [response] = await sgMail.send(msg);
      // response may be an array; statusCode is useful for logs
      console.log('✅ SendGrid status:', response?.statusCode || response);
      return true;
    } catch (sendErr) {
      // Log SendGrid error details (statusCode and body if present)
      console.error('SendGrid send error:', sendErr?.response?.body || sendErr);
      return false;
    }
  } catch (err) {
    console.error('❌ Error in sendBookingPDFEmail:', err);
    return false;
  }
}

module.exports = sendBookingPDFEmail;
