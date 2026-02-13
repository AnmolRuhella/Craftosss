import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      productId,
      productName,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      quantity,
      message,
      customization,
      totalPrice,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !productName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@craftoss.com";

    // Send email to admin
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .detail-label { font-weight: bold; color: #6b7280; }
            .detail-value { color: #111827; }
            .price { font-size: 24px; font-weight: bold; color: #059669; }
            .footer { background: #111827; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Order Received!</h1>
              <p>Craftoss - Handcrafted with Love</p>
            </div>
            
            <div class="content">
              <h2 style="color: #111827;">Order Details</h2>
              
              <div class="order-details">
                <div class="detail-row">
                  <span class="detail-label">Product:</span>
                  <span class="detail-value">${productName}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Quantity:</span>
                  <span class="detail-value">${quantity}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Total Price:</span>
                  <span class="price">₹${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <h3 style="color: #111827; margin-top: 30px;">Customer Information</h3>
              
              <div class="order-details">
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value">${customerName}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">${customerEmail}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">${customerPhone}</span>
                </div>
                
                ${customerAddress ? `
                <div class="detail-row">
                  <span class="detail-label">Address:</span>
                  <span class="detail-value">${customerAddress}</span>
                </div>
                ` : ''}
                
                ${message ? `
                <div style="margin-top: 20px;">
                  <span class="detail-label">Message:</span>
                  <p style="margin-top: 10px; padding: 15px; background: #f3f4f6; border-radius: 6px;">${message}</p>
                </div>
                ` : ''}
                
                ${customization ? `
                <div style="margin-top: 20px;">
                  <span class="detail-label">Customization Request:</span>
                  <p style="margin-top: 10px; padding: 15px; background: #fef3c7; border-radius: 6px;">${customization}</p>
                </div>
                ` : ''}
              </div>
            </div>
            
            <div class="footer">
              <p>This order was placed through your Craftoss website</p>
              <p style="font-size: 12px; margin-top: 10px;">Please contact the customer within 24 hours</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    await resend.emails.send({
      from: "Craftoss Orders <orders@craftoss.com>",
      to: adminEmail,
      replyTo: customerEmail,
      subject: `🎨 New Order: ${productName} - ${customerName}`,
      html: emailHtml,
    });

    // Send confirmation email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .thank-you { font-size: 24px; font-weight: bold; color: #111827; text-align: center; margin: 20px 0; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669; }
            .footer { background: #111827; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Thank You for Your Order!</h1>
              <p>Craftoss - Handcrafted with Love</p>
            </div>
            
            <div class="content">
              <p class="thank-you">Hi ${customerName}! 👋</p>
              
              <div class="message-box">
                <p>Thank you for choosing Craftoss! We're excited to craft <strong>${productName}</strong> for you.</p>
                
                <p>Your order details have been received and we'll contact you within 24 hours to confirm and discuss the next steps.</p>
                
                ${customization ? `<p style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-top: 15px;"><strong>Your customization request:</strong> ${customization}</p>` : ''}
                
                <p style="margin-top: 20px;"><strong>Order Summary:</strong></p>
                <ul>
                  <li>Product: ${productName}</li>
                  <li>Quantity: ${quantity}</li>
                  <li>Total: ₹${totalPrice.toLocaleString()}</li>
                </ul>
              </div>
              
              <p style="text-align: center; color: #6b7280;">If you have any questions, feel free to reply to this email.</p>
            </div>
            
            <div class="footer">
              <p>🎨 Craftoss - Where Art Meets Craftsmanship</p>
              <p style="font-size: 12px; margin-top: 10px;">Made with ❤️ in India</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: "Craftoss <hello@craftoss.com>",
      to: customerEmail,
      subject: `Order Confirmation - ${productName}`,
      html: customerEmailHtml,
    });

    return NextResponse.json(
      { 
        message: "Order placed successfully! Check your email for confirmation.",
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Failed to process order. Please try again." },
      { status: 500 }
    );
  }
}
