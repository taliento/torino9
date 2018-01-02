import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AService } from './a-service.service';
import { Branca} from '../models';
import { Observable } from 'rxjs/Observable';

const BRANCHE_COMBO = [
  {
    id: 'LC',
    title: 'Lupetti',
    subtitle: '(L/C) - bambini/e dai 8 ai 11/12 anni',
    icon: 'fa fa-paw'
  },
  {
    id: 'EG',
    title: 'Esploratori e Guide',
    subtitle: '(E/G) - ragazzi/e dai 11/12 ai 16 anni',
    icon: 'fa fa-fire'
  },
  {
    id: 'RS',
    title: 'Rover e Scolte',
    subtitle: '(R/S) - giovani dai 16 ai 20/21 anni',
    icon: 'fa fa-plane'
  }
]; // XXX

const BRANCHE_COLORS = ['blue', 'green', 'red', 'yellow']; // XXX

@Injectable()
export class BrancaService extends AService {

  brancheCombo = BRANCHE_COMBO; // XXX
  brancheColors = BRANCHE_COLORS;

  constructor(http: HttpClient) {
    super(http);
  }

  getBranche() {
    return this.brancheCombo;
  }

  getBrancheColors() {
    return this.brancheColors;
  }

  getAll(): Promise<Branca[]> {
    return this.http.
      get<Branca[]>(this.apiUrl + '/branca')
      .toPromise()
      .catch(this.handleError);
  }

  getById(_id: string): Promise<Branca> {
      return this.http.
      get<Branca>(this.apiUrl + `/branca/get/${_id}`)
      .toPromise()
      .catch(this.handleError);
  }

  insert(branca: Branca) : Observable<Branca>{
    return this.http.post<Branca>(this.apiUrl + '/branca/insert', branca);
  }

  insertUpload(formData: FormData): Observable<Branca> {
    return this.http.post<Branca>(this.apiUrl + '/branca/insertUpload', formData);
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + `/branca/${_id}`,{responseType: 'text'});
  }

}
