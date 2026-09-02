export interface CartItemType {
  product: {
    id: number;
    price: number;
    title: string;
    thumbnail: string;
  };
  quantity: number;
}

export function calculateSubtotal(items: CartItemType[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function calculateTax(subtotal: number): number {
  return subtotal * 0.05;
}

export function calculateDiscount(subtotal: number): number {
  return subtotal > 100 ? subtotal * 0.10 : 0;
}

export function calculateTotal(subtotal: number, tax: number, discount: number): number {
  return subtotal + tax - discount;
}
