import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HistoryModel} from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private products: any[];
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {
  }

  getUserHistory(userId: number) {
    return this.http.get<HistoryModel>(this.SERVER_URL + '/history/' + userId).toPromise();
  }

}

interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}

