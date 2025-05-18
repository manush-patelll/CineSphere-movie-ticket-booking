const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const { PassThrough } = require('stream');
const streamBuffers = require('stream-buffers');

async function sendBookingPDFEmail(booking) {
    try {
        const recipientEmail = booking.user_id.email;

        if (!recipientEmail) {
            throw new Error('No recipient email provided');
        }

        // 1. Create PDF Document
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50,
            bufferPages: true
        });

        const outputStream = new streamBuffers.WritableStreamBuffer({
            initialSize: (100 * 1024),
            incrementAmount: (10 * 1024)
        });

        doc.pipe(outputStream);

        // 2. Add content to PDF
        doc.font('Helvetica-Bold')
            .fontSize(20)
            .text('Booking Confirmation', { align: 'center' })
            .moveDown();

        doc.font('Helvetica')
            .fontSize(12)
            .text(`Movie: ${booking.showtime_id.movie_id.title}`)
            .text(`Showtime: ${new Date(booking.showtime_id.start_time).toLocaleString()}`)
            .text(`Screen: ${booking.screen_id.screenName}`)
            .text(`Seats: ${booking.seats.join(", ")}`)
            .text(`Total Amount: ${booking.total_amount} RS.`)
            .text(`Booking ID: ${booking.booking_reference}`)
            .moveDown();

        // 3. Generate and Embed QR Code
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
            const qrImage = Buffer.from(qrDataUrl.split(",")[1], 'base64');

            const qrSize = 120;
            const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
            doc.image(qrImage, pageWidth - qrSize + 50, 50, {
                width: qrSize,
                height: qrSize
            });
        } catch (err) {
            console.error('QR Code Error:', err);
        }

        // 4. Add footer at the correct position
        const footerText = 'Thank you for your booking!';
        const footerY = doc.page.height - 50; // Position from bottom

        // Check if we have enough space for the footer
        if (doc.y < footerY - 20) { // 20 is arbitrary padding
            // Enough space - add footer on current page
            doc.fontSize(10)
                .text(footerText, {
                    align: 'center',
                    width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
                    continued: false // Ensure this is the last text on page
                });
        } else {
            // Not enough space - move to next page
            doc.addPage();
            doc.fontSize(10)
                .text(footerText, {
                    align: 'center',
                    width: doc.page.width - doc.page.margins.left - doc.page.margins.right
                });
        }

        doc.end();

        // Wait for the PDF to finish writing
        await new Promise((resolve) => {
            outputStream.on('finish', resolve);
        });

        const pdfBuffer = outputStream.getContents();

        if (!pdfBuffer) {
            throw new Error('Failed to generate PDF');
        }

        // 5. Setup Email Transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 6. Send Email
        const mailOptions = {
            from: `CeneSphere <${process.env.EMAIL_USER}>`,
            to: recipientEmail,
            subject: `Your Booking Confirmation - ${booking.booking_reference}`,
            text: `Dear customer,\n\nPlease find attached your booking details for ${booking.showtime_id.movie_id.title}.\n\nThank you for choosing us!`,
            attachments: [
                {
                    filename: `Booking_${booking.booking_reference}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.response);
        return true;
    } catch (err) {
        console.error('❌ Error in sendBookingPDFEmail:', err);
        throw err;
    }
}

module.exports = sendBookingPDFEmail;