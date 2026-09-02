import React, { useEffect, useState } from "react";
import {
  X,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Tag,
  Package,
  Scale,
  Box,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Product } from "../../types/product";
import { useCartStore } from "../../store/cartStore";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const [activeImage, setActiveImage] = useState(product.thumbnail);
  const [showReviews, setShowReviews] = useState(false);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(product.thumbnail);
    setShowReviews(false);
  }, [product]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addItem(product);
    onClose();
  };

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-xl shadow-2xl max-w-4xl w-full relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-gray-100 rounded-full transition-colors text-text-main shadow-sm"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Images */}
        <div className="md:w-1/2 bg-background p-6 flex flex-col items-center justify-start border-r border-slate-200 overflow-y-auto custom-scrollbar">
          <div className="w-full aspect-square flex items-center justify-center bg-white rounded-lg p-4 mb-4 shadow-sm border border-slate-100 mt-8">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-2 w-full justify-start md:justify-center pb-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden bg-white ${activeImage === img ? "border-primary" : "border-transparent hover:border-slate-300"} transition-all`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start mb-2 mt-4 md:mt-0">
            <div className="text-sm text-primary font-medium uppercase tracking-wider">
              {product.brand || product.category}
            </div>

            {product.availabilityStatus && (
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${product.availabilityStatus === "In Stock" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}
              >
                {product.availabilityStatus}
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-2">
            {product.title}
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-background px-2 py-1 rounded text-sm font-medium">
              <Star className="h-4 w-4 text-warning fill-current" />
              <span>{product.rating.toFixed(2)}</span>
            </div>

            {product.stock !== undefined && (
              <div className="flex items-center gap-1 text-sm text-text-muted">
                <Package className="h-4 w-4" />
                <span>{product.stock} available</span>
              </div>
            )}

            {product.minimumOrderQuantity && (
              <div className="text-sm text-text-muted bg-slate-100 px-2 py-1 rounded">
                Min Order: {product.minimumOrderQuantity}
              </div>
            )}
          </div>

          <div className="flex items-end gap-3 mb-6">
            <div className="text-3xl font-bold text-text-main">
              ${product.price.toFixed(2)}
            </div>
            {product.discountPercentage ? (
              <div className="text-sm font-medium text-success mb-1">
                {product.discountPercentage}% OFF
              </div>
            ) : null}
          </div>

          <div className="text-text-muted mb-8 text-sm leading-relaxed">
            <p>
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* Extra Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
            {product.shippingInformation && (
              <div className="flex items-center gap-2 text-text-muted">
                <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="truncate" title={product.shippingInformation}>
                  {product.shippingInformation}
                </span>
              </div>
            )}
            {product.warrantyInformation && (
              <div className="flex items-center gap-2 text-text-muted">
                <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="truncate" title={product.warrantyInformation}>
                  {product.warrantyInformation}
                </span>
              </div>
            )}
            {product.returnPolicy && (
              <div className="flex items-center gap-2 text-text-muted">
                <RefreshCcw className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="truncate" title={product.returnPolicy}>
                  {product.returnPolicy}
                </span>
              </div>
            )}
            {product.weight !== undefined && (
              <div className="flex items-center gap-2 text-text-muted">
                <Scale className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Weight: {product.weight}</span>
              </div>
            )}
            {product.dimensions && (
              <div className="flex items-center gap-2 text-text-muted">
                <Box className="h-4 w-4 text-primary flex-shrink-0" />
                <span>
                  {product.dimensions.width} x {product.dimensions.height} x{" "}
                  {product.dimensions.depth}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                  <Tag className="h-3 w-3" />
                  <span className="capitalize">{tag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Meta Info (QR/Barcode/SKU) */}
          {(product.meta || product.sku) && (
            <div className="flex gap-4 mb-6 items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
              {product.meta?.qrCode && (
                <img
                  src={product.meta.qrCode}
                  alt="QR Code"
                  className="w-20 h-20 object-contain bg-white border border-slate-200 rounded p-1"
                />
              )}
              <div className="flex flex-col justify-center text-xs text-text-muted gap-1">
                {product.sku && (
                  <span>
                    SKU:{" "}
                    <span className="font-mono text-slate-600 font-medium">
                      {product.sku}
                    </span>
                  </span>
                )}
                {product.meta?.barcode && (
                  <span>
                    Barcode:{" "}
                    <span className="font-mono text-slate-600">
                      {product.meta.barcode}
                    </span>
                  </span>
                )}
                {product.meta?.updatedAt && (
                  <span>
                    Updated:{" "}
                    {new Date(product.meta.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mb-8 border-t border-slate-100 pt-6">
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="w-full flex items-center justify-between font-semibold text-text-main text-sm uppercase tracking-wider focus:outline-none hover:text-primary transition-colors"
              >
                <span>Reviews ({product.reviews.length})</span>
                {showReviews ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {showReviews && (
                <div className="space-y-4 mt-6">
                  {product.reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-text-main">
                          {review.reviewerName}
                        </span>
                        <div className="flex items-center text-warning">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs ml-1 font-bold">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-text-muted italic">
                        "{review.comment}"
                      </p>
                      <div className="text-xs text-slate-400 mt-2">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-slate-100">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none text-lg shadow-md"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
