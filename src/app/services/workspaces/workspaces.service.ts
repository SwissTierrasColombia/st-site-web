import { OperatorByManager } from './../../shared/models/operator-by-manager.interface';
import { WorkspaceActiveByMunicipalityInterface } from './../../shared/models/workspace-active-by-municipality.interface';
import { OperatorsAssignWorkspaceInterface } from './../../shared/models/operators-assign-workspace.interface';
import { DepartamentsInterface } from './../../shared/models/departaments.interface';
import { GetWorkspacesByOperatorInterface } from './../../sections/lev-cat-reception/models/get-workspaces-by-operator.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MunicipalityInterface } from 'src/app/shared/models/municipality.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkspacesService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }

  /**
   * getDepartments
   */
  public getDepartments() {
    return this.httpClient.get<DepartamentsInterface[]>(
      this.url + '/workspaces/v1/departments'
    );
  }
  /**
   * GetMunicipalitiesByDeparment
   */
  public GetMunicipalitiesByDeparment(idDepartament: number) {
    return this.httpClient.get<MunicipalityInterface[]>(
      this.url +
        '/workspaces/v1/departments/' +
        idDepartament +
        '/municipalities'
    );
  }
  /**
   * getWorkSpaceByMunicipality
   */
  public getWorkSpaceByMunicipality(idMunicipality: string) {
    return this.httpClient.get(
      this.url + '/workspaces/v1/workspaces/municipalities/' + idMunicipality
    );
  }
  /**
   * CreateWorkspace
   */
  public createWorkspace(data: any) {
    const form = new FormData();
    form.append('supportFile', data.supportFile);
    form.append('managerCode', data.managerCode);
    form.append('observations', data.observations);
    form.append('startDate', data.startDate);
    data.municipalityId.forEach((element, index) => {
      form.append('municipalities[' + index + ']', element);
    });
    return this.httpClient.post(this.url + '/workspaces/v1/workspaces', form);
  }
  /**
   * GetWorkSpace
   */
  public getWorkSpace(idWorkspace: number) {
    return this.httpClient.get(
      this.url + '/workspaces/v1/workspaces/' + idWorkspace
    );
  }
  /**
   * updateWorkSpace
   */
  public updateWorkSpace(idWorkspace: number, data: any) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/workspaces/' + idWorkspace,
      data
    );
  }
  /**
   * getSupportsByWorkSpace
   */
  public getSupportsByWorkSpace(idWorkspace: number) {
    return this.httpClient.get(
      this.url + '/workspaces/v1/workspaces/' + idWorkspace + '/supports'
    );
  }
  /**
   * assingOperatorToWorkSpace
   */
  public assingOperatorToWorkSpace(idWorkspace: number, data: FormData) {
    return this.httpClient.post(
      this.url + '/workspaces/v1/workspaces/' + idWorkspace + '/operators',
      data
    );
  }
  /**
   * getWorkSpaceActiveByMunicipality
   */
  public getWorkSpaceActiveByMunicipality(idMunicipality: number) {
    return this.httpClient.get<WorkspaceActiveByMunicipalityInterface>(
      this.url +
        '/workspaces/v1/workspaces/municipalities/' +
        idMunicipality +
        '/active'
    );
  }
  /**
   * createRequest
   */
  public createRequest(idMunicipality: number, data: any) {
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/providers/municipalities/' +
        idMunicipality +
        '/requests',
      data
    );
  }
  /**
   * getPendingRequestByProvider
   */
  public getPendingRequestByProvider() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/providers/pending-requests'
    );
  }
  /**
   * loadSupplyFromRequest
   */
  public loadSupplyFromRequest(idInsumo: string, data: FormData) {
    const headers = new HttpHeaders({ 'Transfer-Encoding': 'chunked' });
    return this.httpClient.put(
      this.url + '/workspaces/v1/providers/requests/' + idInsumo,
      data,
      { headers }
    );
  }
  /**
   * closeRequest
   */
  public closeRequest(idInsumo: number) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/providers/requests/' + idInsumo + '/close',
      {}
    );
  }
  /**
   * GetSuppliesByMunicipality
   */
  public GetSuppliesByMunicipalityXTF(idMunicipality: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/supplies/' +
        idMunicipality +
        '?extensions=xtf&active=true'
    );
  }
  /**
   * GetIntegrationCadastreRegistration
   */
  public GetIntegrationCadastreRegistration(idMunicipality: number, data: any) {
    return this.httpClient.post(
      this.url + '/workspaces/v1/workspaces/integration/' + idMunicipality,
      data
    );
  }
  /**
   * GetIntegrationsByWorkspace
   */
  public GetIntegrationsByWorkspace(idWorkspace: number) {
    return this.httpClient.get(
      this.url + '/workspaces/v1/workspaces/' + idWorkspace + '/integrations'
    );
  }
  /**
   * StartIntegrationAssited
   */
  public StartIntegrationAssited(idWorkspace: number, idIntegration: number) {
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/workspaces/' +
        idWorkspace +
        '/integrations/' +
        idIntegration +
        '',
      {}
    );
  }
  /**
   * GenerateProductFromIntegration
   */
  public GenerateProductFromIntegration(
    idWorkspace: number,
    idIntegration: number
  ) {
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/workspaces/' +
        idWorkspace +
        '/integrations/' +
        idIntegration +
        '/export',
      {}
    );
  }
  /**
   * GetPendingTasksUser
   */
  public GetPendingTasksUser() {
    return this.httpClient.get(this.url + '/workspaces/v1/tasks/pending');
  }
  /**
   * GetTypesModels
   */
  public GetTypesModels() {
    return this.httpClient.get(this.url + '/ili/versions/v1/versions');
  }
  /**
   * deleteIntegration
   */
  public deleteIntegration(idWorkspace: number, idIntegration: number) {
    return this.httpClient.delete(
      this.url +
        '/workspaces/v1/workspaces/' +
        idWorkspace +
        '/integrations/' +
        idIntegration
    );
  }
  /**
   * GetRequestByManager
   */
  public GetRequestByManager() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/providers/requests/emmiters'
    );
  }
  /**
   * GetSuppliesByMunicipalityFilter
   */
  public GetSuppliesByMunicipalityFilter(
    idMunicipality: number,
    page: number,
    active: boolean,
    operatorId?: number
  ) {
    if (operatorId) {
      return this.httpClient.get(
        this.url +
          '/workspaces/v1/supplies/' +
          idMunicipality +
          '?page=' +
          page +
          '&active=' +
          active +
          '&operator=' +
          operatorId
      );
    }
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/supplies/' +
        idMunicipality +
        '?page=' +
        page +
        '&active=' +
        active
    );
  }
  /**
   * downloadSupplie
   */
  public downloadSupplie(supplyId: number) {
    return this.httpClient.get(
      this.url + '/workspaces/v1/workspaces/download-supply/' + supplyId,
      { responseType: 'arraybuffer', observe: 'response' }
    );
  }
  public deleteSupplies(idMunicipality: number, supplyId: number) {
    return this.httpClient.delete(
      this.url +
        '/workspaces/v1/workspaces/' +
        idMunicipality +
        '/supplies/' +
        supplyId
    );
  }
  /**
   * changePassword
   */
  public changePassword(data: any) {
    return this.httpClient.post(
      this.url + '/workspaces/v1/administration/users/reset-password',
      data
    );
  }
  /**
   * deliveriesSupplies
   */
  public deliveriesSupplies(idWorkspace: number, data: any) {
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/workspaces/' +
        idWorkspace +
        '/operators/deliveries',
      data
    );
  }
  /**
   * GetDeliveriesToOperator
   */
  public GetDeliveriesToOperator() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/workspaces/operators/deliveries'
    );
  }
  /**
   * CloseDelivery
   */
  public CloseDelivery(idDelivery) {
    return this.httpClient.put(
      this.url +
        '/workspaces/v1/operators/deliveries/' +
        idDelivery +
        '/disable',
      {}
    );
  }
  /**
   * downloadSupport
   */
  public downloadSupport(workspaceId: number, supportId: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/workspaces/' +
        workspaceId +
        '/download-support/' +
        supportId,
      { responseType: 'arraybuffer', observe: 'response' }
    );
  }
  public getAttendedRequestByProvider() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/providers/closed-requests'
    );
  }
  /**
   * CreateUser
   */
  public CreateUser(data: any) {
    return this.httpClient.post(
      this.url + '/workspaces/v1/administration/users',
      data
    );
  }
  /**
   * GetUsers
   */
  public getUsers() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/administration/users'
    );
  }
  /**
   * UpdateUser
   */
  public UpdateUser(idUser: number, data: any) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/administration/users/' + idUser,
      data
    );
  }
  /**
   * DisableUser
   */
  public DisableUser(idUser: number, data: any) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/administration/users/' + idUser + '/disable',
      data
    );
  }
  /**
   * EnableUser
   */
  public EnableUser(idUser: number, data: any) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/administration/users/' + idUser + '/enable',
      data
    );
  }
  /**
   * AddProfileToUser
   */
  public AddProfileToUser(idUser: number, data: any) {
    return this.httpClient.post(
      this.url + '/workspaces/v1/administration/users/' + idUser + '/profiles',
      data
    );
  }
  /**
   * RemoveProfileToUser
   */
  public RemoveProfileToUser(idUser: number, data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.httpClient.delete(
      this.url + '/workspaces/v1/administration/users/' + idUser + '/profiles',
      options
    );
  }
  /**
   * GetManagerProfiles
   */
  public GetManagerProfiles() {
    return this.httpClient.get(this.url + '/managers/v1/profiles');
  }
  /**
   * createProfile
   */
  public createProfile(data: any) {
    return this.httpClient.post(
      this.url + '/workspaces/v1/providers/profiles',
      data
    );
  }
  /**
   * GetProviderProfiles
   */
  public GetProviderProfiles() {
    return this.httpClient.get(this.url + '/workspaces/v1/providers/profiles');
  }
  /**
   * updateProfileProvider
   */
  public updateProfileProvider(data: any, id: number) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/providers/profiles/' + id,
      data
    );
  }
  /**
   * deleteProfileProvider
   */
  public deleteProfileProvider(id: number) {
    return this.httpClient.delete(
      this.url + '/workspaces/v1/providers/profiles/' + id
    );
  }
  /**
   * GetProviderTypeSupplies
   */
  public GetProviderTypeSupplies() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/providers/types-supplies'
    );
  }
  /**
   * CreateTypeSupplies
   */
  public CreateTypeSupplies(data: any) {
    return this.httpClient.post(
      this.url + '/workspaces/v1/providers/types-supplies',
      data
    );
  }
  /**
   * SaveTypeSupplies
   */
  public SaveTypeSupplies(id: number, data: any) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/providers/types-supplies/' + id,
      data
    );
  }
  /**
   * deleteTypeSupplies
   */
  public deleteTypeSupplies(id: number) {
    return this.httpClient.delete(
      this.url + '/workspaces/v1/providers/types-supplies/' + id
    );
  }
  /**
   * searchSuppliesMunicipality
   */
  public searchSuppliesMunicipality(page: string, municipality: number) {
    let url =
      this.url + '/workspaces/v1/providers/requests/municipality?page=' + page;
    url = url + '&municipality=' + municipality;
    return this.httpClient.get(url);
  }
  /**
   * searchSuppliesProviders
   */
  public searchSuppliesProviders(page: string, idProvider: string) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/providers/requests/provider?page=' +
        page +
        '&provider=' +
        idProvider
    );
  }
  /**
   * searchSuppliesOrder
   */
  public searchSuppliesOrder(idPackage?: string) {
    if (idPackage !== '') {
      return this.httpClient.get(
        this.url +
          '/workspaces/v1/providers/requests/package?package=' +
          idPackage
      );
    }
    return this.httpClient.get(
      this.url + '/workspaces/v1/providers/requests/package'
    );
  }
  /**
   * DownloadReportIndividual
   */
  public DownloadReportIndividual(idDelivery: number, idSupply: string) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/operators/deliveries/' +
        idDelivery +
        '/reports-individual/' +
        idSupply,
      { responseType: 'arraybuffer', observe: 'response' }
    );
  }
  /**
   * DownloadReportGeneral
   */
  public DownloadReportGeneral(idDelivery: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/operators/deliveries/' +
        idDelivery +
        '/reports-total',
      { responseType: 'arraybuffer', observe: 'response' }
    );
  }
  /**
   * GetDeliveriesClosed
   */
  public GetDeliveriesClosed() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/workspaces/operators/deliveries/closed'
    );
  }
  /**
   * GetIntegrationRunning
   */
  public GetIntegrationRunning() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/integrations/running'
    );
  }
  /**
   * GetPossiblesIntegration
   */
  public GetPossiblesIntegration() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/integrations/pending'
    );
  }
  /**
   * GetSuppliesRequestedToReview
   */
  public GetSuppliesRequestedToReview() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/providers/supplies-review'
    );
  }
  /**
   * StartRevision
   */
  public StartRevision(supplyRequestedId: number) {
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/providers/supplies-review/' +
        supplyRequestedId +
        '/start',
      {}
    );
  }
  /**
   * GetRecordsFromXTF
   */
  public GetRecordsFromXTF(supplyRequestedId: number, page: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/providers/supplies-review/' +
        supplyRequestedId +
        '/records?page=' +
        page
    );
  }
  /**
   * UpdateRecordPDF
   */
  public UpdateRecordPDF(
    supplyRequestedId: number,
    boundarySpaceId: number,
    file: any
  ) {
    const form = new FormData();
    form.append('file', file);
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/providers/supplies-review/' +
        supplyRequestedId +
        '/update/' +
        boundarySpaceId,
      form
    );
  }
  /**
   * closeRevisionRecord
   */
  public closeRevisionRecord(supplyRequestedId: number) {
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/providers/supplies-review/' +
        supplyRequestedId +
        '/close',
      {}
    );
  }
  /**
   * skipRevision
   */
  public skipRevision(supplyRequestedId: number) {
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/providers/supplies-review/' +
        supplyRequestedId +
        '/skip',
      {}
    );
  }
  /**
   * createPetition
   */
  public createPetition(data: any) {
    return this.httpClient.post(this.url + '/workspaces/v1/petitions', data);
  }
  /**
   * getPetitionsForManager
   */
  public getPetitionsForManager(providerId?: string) {
    if (providerId !== '0') {
      return this.httpClient.get(
        this.url + '/workspaces/v1/petitions/manager?provider=' + providerId
      );
    }
    return this.httpClient.get(this.url + '/workspaces/v1/petitions/manager');
  }
  /**
   * getPetitionsForProviderOpen
   */
  public getPetitionsForProviderOpen() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/petitions/provider/open'
    );
  }
  /**
   * getPetitionsForProviderClose
   */
  public getPetitionsForProviderClose() {
    return this.httpClient.get(
      this.url + '/workspaces/v1/petitions/provider/close'
    );
  }
  /**
   * acceptPetition
   */
  public acceptPetition(petitionId: number, data: any) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/petitions/' + petitionId + '/accept',
      data
    );
  }
  /**
   * rejectPetition
   */
  public rejectPetition(petitionId: number, data: any) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/petitions/' + petitionId + '/reject',
      data
    );
  }
  /**
   * activeSupplies
   */
  public activeSupplies(supplyId: number) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/supplies/' + supplyId + '/active',
      {}
    );
  }
  /**
   * inactiveSupplies
   */
  public inactiveSupplies(supplyId: number) {
    return this.httpClient.put(
      this.url + '/workspaces/v1/supplies/' + supplyId + '/inactive',
      {}
    );
  }
  /**
   * createAttachmentsSupply
   */
  public createAttachmentsSupply(municipalityId: number, data: any) {
    return this.httpClient.post(
      this.url +
        '/workspaces/v1/cadastral-authority/supplies/' +
        municipalityId,
      data
    );
  }
  /**
   * getSuppliesAttachments
   */
  public getSuppliesAttachments(municipalityId: number, managerId?: number) {
    if (managerId) {
      return this.httpClient.get(
        this.url +
          '/workspaces/v1/supplies/' +
          municipalityId +
          '?active=false&manager=' +
          managerId
      );
    }
    return this.httpClient.get(
      this.url + '/workspaces/v1/supplies/' + municipalityId + '?active=false'
    );
  }
  /**
   * EnableTypeSupply
   */
  public enableTypeSupply(typeSupplyId: number) {
    return this.httpClient.put(
      this.url +
        '/workspaces/v1/providers/types-supplies/' +
        typeSupplyId +
        '/enable',
      {}
    );
  }
  /**
   * DisableTypeSupply
   */
  public disableTypeSupply(typeSupplyId: number) {
    return this.httpClient.put(
      this.url +
        '/workspaces/v1/providers/types-supplies/' +
        typeSupplyId +
        '/disable',
      {}
    );
  }
  /**
   * getReportAuthority
   */
  public getReportAuthority(municipalityId: number, managerId: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/cadastral-authority/report/' +
        municipalityId +
        '?manager=' +
        managerId,
      { responseType: 'arraybuffer', observe: 'response' }
    );
  }
  /**
   * GetWorkspacesByLocation
   */
  public GetWorkspacesByLocation(
    departamentId: number,
    municipalityId?: number
  ) {
    if (municipalityId) {
      return this.httpClient.get(
        this.url +
          '/workspaces/v1/workspaces/location?department=' +
          departamentId +
          '&municipality=' +
          municipalityId
      );
    } else {
      return this.httpClient.get(
        this.url +
          '/workspaces/v1/workspaces/location?department=' +
          departamentId
      );
    }
  }
  /**
   * getMunicipalitiesThatNotHasWorkspaces
   */
  public getMunicipalitiesThatNotHasWorkspaces(departmentId: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v1/municipalities/not-workspace/departments/' +
        departmentId
    );
  }
  /**
   * getMunicipalitiesByManager
   */
  public getMunicipalitiesByManager(managerId: number) {
    return this.httpClient.get(
      this.url + '/workspaces/v1/municipalities/by-manager/' + managerId
    );
  }
  /**
   * getDeliveriesByManager
   */
  public getDeliveriesByManager() {
    return this.httpClient.get(this.url + '/workspaces/v1/managers/deliveries');
  }
  /**
   * getDeliveryByIdFromManager
   */
  public getDeliveryByIdFromManager(deliveryId: number) {
    return this.httpClient.get(
      this.url + '/workspaces/v1/managers/deliveries/' + deliveryId
    );
  }
  /**
   * generateReportDeliveryFromManager
   */
  public generateReportDeliveryFromManager(deliveryId: number) {
    return this.httpClient.get(
      this.url + '/workspaces/v1/workspaces/report-delivery/' + deliveryId,
      { responseType: 'arraybuffer', observe: 'response' }
    );
  }
  /**
   * getOnlyOperatorAssignByManager
   */
  public getOnlyOperatorAssignByWorkspace(workspaceId: number) {
    return this.httpClient.get<OperatorsAssignWorkspaceInterface[]>(
      this.url + '/workspaces/v1/workspaces/' + workspaceId + '/operators'
    );
  }
  /**
   * getWorkspacesByOperator
   */
  public getWorkspacesByOperator() {
    return this.httpClient.get<GetWorkspacesByOperatorInterface[]>(
      this.url + '/workspaces/v1/workspaces/operators'
    );
  }
  /**
   * getOperatorsByManager
   */
  public getOperatorsByManager() {
    return this.httpClient.get<OperatorByManager[]>(
      this.url + '/workspaces/v1/managers/operators'
    );
  }
  /**
   * configureMap
   */
  public configureMap(integrationId: number) {
    return this.httpClient.put(
      `${this.url}/workspaces/v1/integrations/${integrationId}/configure-view`,
      {}
    );
  }
}
