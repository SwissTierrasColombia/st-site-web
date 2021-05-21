import { addProductToDeliveryInterface } from './../../sections/quality-module/models/add-product-to-delivery.interface';
import { makeDeliveryToManagerInterface } from './../../sections/quality-module/models/make-delivery-to-manager.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { findProductsFromManagerInterface } from 'src/app/sections/quality-module/models/find-products-from-manager.interface';
import { findDeliveriesInterface } from 'src/app/sections/quality-module/models/find-deliveries.interface';

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
  public findProductsFromManager(manager: string) {
    return this.httpClient.get<findProductsFromManagerInterface[]>(
      this.url + '/quality/v1/products?manager=' + manager
    );
  }
  /**
   * makeDeliveryToManager
   */
  public makeDeliveryToManager(data: makeDeliveryToManagerInterface) {
    return this.httpClient.post(this.url + '/quality/v1/deliveries', data);
  }
  /**
   * findDeliveries
   */
  public findDeliveries(
    states: number,
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
    return this.httpClient.get<findDeliveriesInterface>(url);
  }
  /**
   * searchDelivery
   */
  public searchDelivery(deliveryId: number) {
    return this.httpClient.get(
      this.url + '/quality/v1/deliveries/' + deliveryId
    );
  }
  /**
   * addProductToDelivery
   */
  public addProductToDelivery(
    deliveryId: number,
    productId: addProductToDeliveryInterface
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
    return this.httpClient.get(
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
    return this.httpClient.get(
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
}
