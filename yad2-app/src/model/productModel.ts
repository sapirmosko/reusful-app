export interface ProductInterface {
  _id: string;
  userId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStatus: string;
  productDate: string;
  productImage: string;
  imageUrl: string;
  categorieId: string;
  username?: string;
  categorieName?: string;
}
