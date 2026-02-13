"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon, Video, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const CATEGORIES = [
  "Decor",
  "Furniture",
  "Pottery",
  "Textiles",
  "Jewelry",
  "Art",
  "Lighting",
  "Accessories",
];

export default function UploadProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [materialInput, setMaterialInput] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    dimensions: "",
    stock: "",
    customizable: false,
    featured: false,
  });

  // Image dropzone
  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  // Video dropzone
  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    accept: { "video/*": [] },
    maxFiles: 3,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setVideos((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  const handleAddMaterial = () => {
    if (materialInput.trim() && !materials.includes(materialInput.trim())) {
      setMaterials([...materials, materialInput.trim()]);
      setMaterialInput("");
    }
  };

  const handleRemoveMaterial = (material: string) => {
    setMaterials(materials.filter((m) => m !== material));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images,
        videos,
        materials,
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product uploaded successfully! ✨");
        router.push("/product");
        router.refresh();
      } else {
        throw new Error("Failed to upload product");
      }
    } catch (error) {
      alert("Failed to upload product. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Premium Upload</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Add New Product
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcase your handcrafted masterpiece with stunning visuals and detailed information
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8">
            {/* Basic Information Card */}
            <Card className="p-8 bg-white/80 backdrop-blur border-0 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Product Information
                </h2>
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base">
                      Product Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      placeholder="e.g., Handwoven Cotton Throw"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-2 h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-base">
                      Category *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="mt-2 h-11">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-base">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    placeholder="Tell the story of your craft... What makes it special? What inspired you?"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="price" className="text-base">
                      Price (₹) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      required
                      placeholder="2500"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="mt-2 h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock" className="text-base">
                      Stock Quantity
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="10"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="mt-2 h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dimensions" className="text-base">
                      Dimensions
                    </Label>
                    <Input
                      id="dimensions"
                      placeholder="24x36 inches"
                      value={formData.dimensions}
                      onChange={(e) =>
                        setFormData({ ...formData, dimensions: e.target.value })
                      }
                      className="mt-2 h-11"
                    />
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <Label htmlFor="materials" className="text-base">
                    Materials Used
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="materials"
                      placeholder="e.g., Oak Wood"
                      value={materialInput}
                      onChange={(e) => setMaterialInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMaterial())}
                      className="h-11"
                    />
                    <Button
                      type="button"
                      onClick={handleAddMaterial}
                      variant="outline"
                      className="px-6"
                    >
                      Add
                    </Button>
                  </div>
                  {materials.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {materials.map((material) => (
                        <Badge
                          key={material}
                          variant="secondary"
                          className="px-3 py-1.5 text-sm"
                        >
                          {material}
                          <button
                            type="button"
                            onClick={() => handleRemoveMaterial(material)}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.customizable}
                      onChange={(e) =>
                        setFormData({ ...formData, customizable: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Customizable Product
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured Product
                    </span>
                  </label>
                </div>
              </div>
            </Card>

            {/* Image Upload Card */}
            <Card className="p-8 bg-white/80 backdrop-blur border-0 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Product Images
                </h2>
              </div>

              <div
                {...getImageRootProps()}
                className="border-2 border-dashed border-purple-300 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/50 transition-all"
              >
                <input {...getImageInputProps()} />
                <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drop images here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Upload up to 10 images (PNG, JPG, WEBP)
                </p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Product ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Video Upload Card */}
            <Card className="p-8 bg-white/80 backdrop-blur border-0 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Video className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Product Videos
                </h2>
                <Badge variant="secondary">Optional</Badge>
              </div>

              <div
                {...getVideoRootProps()}
                className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all"
              >
                <input {...getVideoInputProps()} />
                <Video className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drop videos here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Upload up to 3 videos (MP4, MOV, max 64MB each)
                </p>
              </div>

              {videos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {videos.map((video, idx) => (
                    <div key={idx} className="relative group">
                      <video
                        src={video}
                        className="w-full h-40 object-cover rounded-lg"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() => setVideos(videos.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || !formData.name || !formData.category || images.length === 0}
                className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {loading ? "Uploading..." : "Publish Product ✨"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
