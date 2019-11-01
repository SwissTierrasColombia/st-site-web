import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParcelsService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix
  }
  public GetBasicInformationParcel(idMunicipality: string, nupre: string, cadastralCode: string, fmi: string) {
    return this.httpClient.get<any>(`${this.url}/rdm/parcels?municipality=${idMunicipality}&nupre=${nupre}&cadastralCode=${cadastralCode}&fmi=${fmi}`);
  }
  public GetGeometryInformationParcel(idMunicipality: string, parcelId: number) {
    return this.httpClient.get<any>(`${this.url}/rdm/parcels/geometry?municipality=${idMunicipality}&parcelId=${parcelId}`);
  }

  public GetImageGeometryParcel(idMunicipality: string, parcelId: number) {
    return `${this.url}/rdm/parcels/geometry/image?municipality=${idMunicipality}&parcelId=${parcelId}`;
  }
  public GetGeometryTerrain(idMunicipality: string, terrainId: number) {
    return this.httpClient.get<any>(`${this.url}/rdm/terrains/geometry?municipality=${idMunicipality}&terrainId=${terrainId}`);
  }
  //No se esta utlizando en el momento
  public GetInformationEconomicParcel(idMunicipality: string, fmi: string, cadastralCode: string, nupre: string) {
    return this.httpClient.get<any>(`${this.url}/rdm/parcels/economic??municipality=${idMunicipality}&cadastralCode=${cadastralCode}&fmi=${fmi}&nupre=${nupre}`);
  }
  public GetInformationLegalParcel(idMunicipality: string, fmi: string, cadastralCode: string, nupre: string) {
    const params = `municipality=${idMunicipality}&fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
    return this.httpClient.get<any>(`${this.url}/rdm/parcels/legal?${params}`);
  }
  public GetInformationPhysicalParcel(idMunicipality: string, fmi: string, cadastralCode: string, nupre: string) {
    const params = `municipality=${idMunicipality}&fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
    return this.httpClient.get<any>(`${this.url}/rdm/parcels/physical?${params}`);
  }
  //No se utiliza en el momento
  public GetInformationIgacParcel(idMunicipality: string, fmi: string, cadastralCode: string, nupre: string) {
    const params = `municipality=${idMunicipality}&fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
    return this.httpClient.get<any>(`${this.url}/rdm/parcels/igac-property-record-card?${params}`);
  }

  public GetInformationPartyParcel(idMunicipality: string, tipo: string, idTipo: string) {
    return this.httpClient.get<any>(`${this.url}/rdm/parcels/party?municipality=${idMunicipality}&${tipo}=${idTipo}`);
  }

  public GetInformationCatastralParcel(idMunicipality: string, terrainId: number) {
    return this.httpClient.get<any>(`${this.url}/rdm/parcels/catastral-code?municipality=${idMunicipality}&terrainId=${terrainId}`);
  }
  /**
   * Get Basic Information Parcel
   */
  public GetBasicInformationParcelRecord(idMunicipality: string, tipo: string, idTipo: string) {
    return this.httpClient.get<any>(`${this.url}/rdm/parcels/record?municipality=${idMunicipality}&${tipo}=${idTipo}`)
  }
}
