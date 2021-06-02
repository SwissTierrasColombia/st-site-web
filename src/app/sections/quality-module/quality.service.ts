import { UpdateProduct } from './models/update-product.internace';
import { UpdateDelivery } from './models/update-delivery.internace';
import { AddProductToDeliveryInterface } from './models/add-product-to-delivery.interface';
import { MakeDeliveryToManagerInterface } from './models/make-delivery-to-manager.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FindProductsFromManagerInterface } from './models/find-products-from-manager.interface';
import {
  FindDeliveriesInterface,
  ItemDelivery,
} from './models/find-deliveries.interface';
import { FindProductsFromDeliveryInterface } from './models/find-products-from-delivery.interface';
import { CreateProductInterface } from './models/create-product.interface';
import { AttachmentsFromDeliveryProductInterface } from './models/attachments-from-delivery-product.interface';
@Injectable({
  providedIn: 'root',
})
export class QualityService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }

  /**
   * findProductsFromManager
   */
  public findProductsFromManager(manager?: string) {
    let url = this.url + '/quality/v1/products';
    if (manager) {
      url = url + '?manager=' + manager;
    }
    return this.httpClient.get<FindProductsFromManagerInterface[]>(url);
  }
  /**
   * makeDeliveryToManager
   */
  public makeDeliveryToManager(data: MakeDeliveryToManagerInterface) {
    return this.httpClient.post(this.url + '/quality/v1/deliveries', data);
  }
  /**
   * findDeliveries
   */
  public findDeliveries(
    states: number | string,
    page: number,
    limit: number,
    municipality?: string,
    manager?: string,
    operator?: string,
    code?: string
  ) {
    let url =
      this.url +
      '/quality/v1/deliveries?states=' +
      states +
      '&page=' +
      page +
      '&limit=' +
      limit;
    if (code) {
      url = url + '&code=' + code;
    }
    if (municipality) {
      url = url + '&municipality=' + municipality;
    }
    if (operator) {
      url = url + '&operator=' + operator;
    }
    if (manager) {
      url = url + '&manager=' + manager;
    }
    return this.httpClient.get<FindDeliveriesInterface>(url);
  }
  /**
   * searchDelivery
   */
  public searchDelivery(deliveryId: number) {
    return this.httpClient.get<ItemDelivery>(
      this.url + '/quality/v1/deliveries/' + deliveryId
    );
  }
  /**
   * addProductToDelivery
   */
  public addProductToDelivery(
    deliveryId: number,
    productId: AddProductToDeliveryInterface
  ) {
    return this.httpClient.post(
      this.url + '/quality/v1/deliveries/' + deliveryId + '/products',
      productId
    );
  }
  /**
   * findProductsFromDelivery
   */
  public findProductsFromDelivery(deliveryId: number) {
    return this.httpClient.get<FindProductsFromDeliveryInterface[]>(
      this.url + '/quality/v1/deliveries/' + deliveryId + '/products'
    );
  }
  /**
   * addAttachmentToProduct
   */
  public addAttachmentToProduct(
    deliveryId: number,
    deliveryProductId: number,
    formData: FormData
  ) {
    return this.httpClient.post(
      this.url +
        '/quality/v1/deliveries/' +
        deliveryId +
        '/products/' +
        deliveryProductId +
        '/attachments',
      formData
    );
  }
  /**
   * findAttachmentsFromDeliveryProduct
   */
  public findAttachmentsFromDeliveryProduct(
    deliveryId: number,
    deliveryProductId: number
  ) {
    return this.httpClient.get<AttachmentsFromDeliveryProductInterface[]>(
      this.url +
        '/quality/v1/deliveries/' +
        deliveryId +
        '/products/' +
        deliveryProductId +
        '/attachments'
    );
  }
  /**
   * removeAttachmentFromProduct
   */
  public removeAttachmentFromProduct(
    deliveryId: number,
    deliveryProductId: number,
    attachmentId: number
  ) {
    return this.httpClient.delete(
      this.url +
        '/quality/v1/deliveries/' +
        deliveryId +
        '/products/' +
        deliveryProductId +
        '/attachments/' +
        attachmentId
    );
  }
  /**
   * downloadAttachment
   */
  public downloadAttachment(
    deliveryId: number,
    deliveryProductId: number,
    attachmentId: number
  ) {
    return this.httpClient.get(
      this.url +
        '/quality/v1/deliveries/' +
        deliveryId +
        '/products/' +
        deliveryProductId +
        '/attachments/' +
        attachmentId +
        '/download'
    );
  }
  /**
   * Remove product from delivery
   */
  public removeProductFromDelivery(
    deliveryId: number,
    deliveryProductId: number
  ) {
    return this.httpClient.delete(
      this.url +
        '/quality/v1/deliveries/' +
        deliveryId +
        '/products/' +
        deliveryProductId
    );
  }
  /**
   * Remove delivery
   */
  public removeDelivery(deliveryId: number) {
    return this.httpClient.delete(
      this.url + '/quality/v1/deliveries/' + deliveryId
    );
  }
  /**
   * createProduct
   */
  public createProduct(data: CreateProductInterface) {
    return this.httpClient.post(this.url + '/quality/v1/products', data);
  }
  /**
   * updateDelivery
   */
  public updateDelivery(deliveryId: number, data: UpdateDelivery) {
    return this.httpClient.put(
      this.url + '/quality/v1/deliveries/' + deliveryId,
      data
    );
  }
  /**
   * Update product from delivery
   */
  public updateProductFromDelivery(
    deliveryId: number,
    deliveryProductId: number,
    data: UpdateProduct
  ) {
    return this.httpClient.put(
      this.url +
        '/quality/v1/deliveries/' +
        deliveryId +
        '/products/' +
        deliveryProductId,
      data
    );
  }
  /**
   * Send delivery to manager
   */
  public sendDeliveryToManager(deliveryId: number) {
    return this.httpClient.patch(
      this.url + '/quality/v1/deliveries/' + deliveryId + '/status/delivered',
      {}
    );
  }
}
