import {Injectable} from '@angular/core';
import {ReviewModel} from '../models/review.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private SERVER_ULR = environment.SERVER_URL;

  constructor(private http: HttpClient) {
  }

  getReviewsForProduct(prodId: number){
    return this.http.get(`${this.SERVER_ULR}/review/products/${prodId}`);
  }
}
