import { getProducts } from "@/lib/products";
import { WishlistView } from "@/components/wishlist-view";
export default async function WishlistPage(){const products=await getProducts();return <WishlistView products={products.map(p=>({id:p.id,slug:p.slug,name:p.name,price:p.price,image:p.image}))}/>}
