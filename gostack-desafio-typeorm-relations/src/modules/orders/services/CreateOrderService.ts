import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('User not found');
    }

    const existentProducts = await this.productsRepository.findAllById(
      products,
    );

    if (!existentProducts.length) {
      throw new AppError('Product does not exists');
    }

    const existentProductsIds = existentProducts.map(product => product.id);

    const inexistentProducts = products.filter(
      product => !existentProductsIds.includes(product.id),
    );

    if (inexistentProducts.length) {
      throw new AppError(
        `Could not find product of id ${inexistentProducts[0].id}`,
      );
    }

    const updatedProducts = existentProducts.map(existentProduct => {
      const foundProduct = products.filter(
        product => existentProduct.id === product.id,
      );

      if (foundProduct[0].quantity > existentProduct.quantity) {
        throw new AppError('Not enought products');
      }

      return {
        product_id: foundProduct[0].id,
        price: existentProduct.price,
        quantity: foundProduct[0].quantity,
      };
    });

    const updatedProductsWithQuantity = existentProducts.map(
      existentProduct => {
        const productQuantity = products.filter(
          product => product.id === existentProduct.id,
        )[0].quantity;

        return {
          ...existentProduct,
          quantity: existentProduct.quantity - productQuantity,
        };
      },
    );

    await this.productsRepository.updateQuantity(updatedProductsWithQuantity);

    const order = await this.ordersRepository.create({
      customer,
      products: updatedProducts,
    });

    return order;

    // const updatedProducts: Product[] = [];

    // existentProducts.forEach(existentProduct => {
    //   products.forEach(product => {
    //     if (existentProduct.id === product.id) {
    //       if (product.quantity > existentProduct.quantity) {
    //         throw new AppError(
    //           `Not enought amount of item: ${existentProduct.name}`,
    //         );
    //       }
    //       updatedProducts.push({
    //         ...existentProduct,
    //         price: existentProduct.price,
    //         quantity: product.quantity,
    //       });
    //     }
    //   });
    // });

    // await this.productsRepository.updateQuantity(products);

    // const order = await this.ordersRepository.create({
    //   customer,
    //   products: updatedProducts,
    // });

    // return orders;
  }
}

export default CreateProductService;
