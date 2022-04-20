import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../../models/book.model';

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
];
describe('Cart.component', () => {

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;//para extraer el servicio

    //TestBed
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule//no es una petición real
            ],
            declarations: [
                CartComponent
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();//component ngOnit
    })
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('getTotalPrice returns and amount', () => {
        const totalPrice = component.getTotalPrice(listBook);
        //pueba=valor sumatorio superior a 0
        expect(totalPrice).toBeGreaterThan(0);
        //no va a ser 0
        expect(totalPrice).not.toBe(0);
        //no va a ser nulo. Con el not delante se hace la negación del método
        expect(totalPrice).not.toBeNull();
    });
});
