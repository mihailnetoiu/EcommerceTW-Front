import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {ProductModelServer} from '../../models/product.model';
import {WishlistService} from '../../services/wishlist.service';
import {ReviewService} from '../../services/review.service';
import {ReviewModel} from '../../models/review.model';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  id: number;
  product: ProductModelServer;
  reviewList: ReviewModel[];
  @ViewChild('quantity') quantityInput;

  constructor(private productService: ProductService,
              private wishlistService: WishlistService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router,
              private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
      });
      this.reviewService.getReviewsForProduct(this.id).toPromise().then((result: ReviewModel[]) => this.reviewList = result);
    });
    document.getElementById('defaultOpen').click();
  }

  ngAfterViewInit(): void {
// Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product img zoom
    const zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }

  }

  increase() {
    // tslint:disable-next-line:radix
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1) {
      value++;
    }

    if (value > this.product.quantity) {
      value = this.product.quantity;
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  decrease() {
    // tslint:disable-next-line:radix
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1) {
      value--;
    }

    if (value < 1) {
      value = 1;
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id, this.quantityInput.nativeElement.value);
  }

  addToWishlist(id: number) {
    this.wishlistService.addToWishlist(id);
  }

  filterCategory(categ: string) {
    const category = categ;
    this.router.navigate(['/filter'], {
      state: {
        category,
        productName: undefined
      }
    });
    window.scrollTo(0, 0);
  }

  selectProductTab(productTab) {
    let i;
    let tabcontent;
    let tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(productTab).style.display = 'block';
  }

  calculateAvgRating(product: ProductModelServer) {
    let averageRating = 0;
    const numOfReviews = this.reviewList.length;

    for (const reviewItem of this.reviewList) {
      averageRating += reviewItem.review;
    }

    // tslint:disable-next-line:radix
    return numOfReviews ? parseInt((averageRating / numOfReviews).toFixed()) : 0;
  }

  ratingsFor(product: ProductModelServer, stars: number): number {
    let rating = 0;

    if (stars > 0 && stars < 6) {
      for (const reviewItem of this.reviewList) {
        if (reviewItem.review === stars) {
          ++rating;
        }
      }
    }
    // tslint:disable-next-line:radix
    return parseInt(rating.toFixed());
  }
}
