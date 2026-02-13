"use client";

import { useState } from "react";
import { ShoppingCart, Mail, Phone, MapPin, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";

interface OrderFormProps {
  product: Product;
}

export default function OrderForm({ product }: OrderFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    message: "",
    customization: "",
  });

  const totalPrice = product.price * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        productId: product.id,
        productName: product.name,
        quantity,
        totalPrice,
        ...formData,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          customerAddress: "",
          message: "",
          customization: "",
        });
        setQuantity(1);
      } else {
        throw new Error(data.error || "Failed to place order");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
          <ShoppingCart className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully! 🎉
        </h3>
        <p className="text-gray-600 mb-4">
          Thank you for your order! We've sent a confirmation email to your inbox.
          We'll contact you within 24 hours to finalize the details.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          className="bg-green-600 hover:bg-green-700"
        >
          Place Another Order
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-white border-0 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="h-6 w-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Place Your Order</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Price Summary */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 font-medium">Unit Price:</span>
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <Label htmlFor="quantity" className="text-gray-700 font-medium">
              Quantity:
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10"
              >
                -
              </Button>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center h-10"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10"
              >
                +
              </Button>
            </div>
          </div>

          <div className="border-t border-purple-200 pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total Price:</span>
            <span className="text-3xl font-bold text-purple-600">
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Your Information
          </h3>

          <div>
            <Label htmlFor="customerName" className="flex items-center gap-2">
              <span>Full Name *</span>
            </Label>
            <Input
              id="customerName"
              required
              placeholder="John Doe"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className="mt-2 h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerEmail" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email *</span>
              </Label>
              <Input
                id="customerEmail"
                type="email"
                required
                placeholder="john@example.com"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
                className="mt-2 h-11"
              />
            </div>

            <div>
              <Label htmlFor="customerPhone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Phone *</span>
              </Label>
              <Input
                id="customerPhone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.customerPhone}
                onChange={(e) =>
                  setFormData({ ...formData, customerPhone: e.target.value })
                }
                className="mt-2 h-11"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="customerAddress" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Shipping Address</span>
            </Label>
            <Textarea
              id="customerAddress"
              placeholder="Street, City, State, PIN Code"
              value={formData.customerAddress}
              onChange={(e) =>
                setFormData({ ...formData, customerAddress: e.target.value })
              }
              className="mt-2 min-h-[80px]"
            />
          </div>

          {product.customizable && (
            <div>
              <Label htmlFor="customization" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Customization Request</span>
              </Label>
              <Textarea
                id="customization"
                placeholder="Tell us how you'd like to customize this product..."
                value={formData.customization}
                onChange={(e) =>
                  setFormData({ ...formData, customization: e.target.value })
                }
                className="mt-2 min-h-[80px]"
              />
            </div>
          )}

          <div>
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Additional Message</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Any special requests or questions?"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="mt-2 min-h-[80px]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {loading ? "Processing..." : `Place Order for ₹${totalPrice.toLocaleString()}`}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          🔒 Your information is secure. We'll contact you via email to confirm your order.
        </p>
      </form>
    </Card>
  );
}
