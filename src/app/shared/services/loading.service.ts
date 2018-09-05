import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {

  loading = new Subject();

  setLoading(_loading: boolean) {
   this.loading.next(_loading);
  }

}
