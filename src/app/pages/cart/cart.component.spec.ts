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
    let service: BookService;
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
        service = fixture.debugElement.injector.get(BookService);
    })
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    //test method with return
    it('getTotalPrice returns and amount', () => {
        const totalPrice = component.getTotalPrice(listBook);
        //prueba=valor sumatorio superior a 0
        expect(totalPrice).toBeGreaterThan(0);
        //no va a ser 0
        expect(totalPrice).not.toBe(0);
        //no va a ser nulo. Con el not delante se hace la negación del método
        expect(totalPrice).not.toBeNull();
    });
    /*public onInputNumberChange(action: string, book: Book): void {
        const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
        book.amount = Number(amount);
        this.listCartBook = this._bookService.updateAmountBook(book);
        this.totalPrice = this.getTotalPrice(this.listCartBook);
      }*/
    //test method without return. Every time we press plus
    it('onInputNumberChange increments correctly', () => {
        //we need action: string and book: Book
        //Creamos espias para verificar si se ha llamado o no al método
        //cómo vamos a acceder al servicio, ya que se necesita en el método
        //un test unitatio no debe llamar a otro método
        //acceder al servicio, 3 formas (dos no correctas totalmente)
        const action = 'plus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        };

        //const service = (component as any)._bookService; - no se respeta los tipos
        //const service2 = component['_bookService']; - se puede acceder al servicio aunque sea privado

        //para convertir el servicio para que lo utilicen diferentes métodos. Disponible para más tests
        //const service =fixture.debugElement.injector.get(BookService);//tenemos el servicio
        
        //llamamos al espia antes que al método
        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);//se hace una llamada falsa. no llama al servicio real
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);
        //testeamos si realmente aumenta
        expect(book.amount).toBe(2);
        
        //llamamos al método
        component.onInputNumberChange(action, book);
        //testeamos si realmente aumenta
        expect(book.amount).toBe(3);
        //otra opción es pasar la condición para que sea true
        expect(book.amount === 3).toBe(true);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();





    });
    //test method without return. Every time we press minus
    it('onInputNumberChange decrements correctly', () => {
        
        const action = 'minus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 3
        };

        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);//se hace una llamada falsa. no llama al servicio real
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);
        
        //testeamos si realmente decrementa
        expect(book.amount).toBe(3);

        component.onInputNumberChange(action, book);

        //testeamos si realmente decrementa
        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();





    });


});
