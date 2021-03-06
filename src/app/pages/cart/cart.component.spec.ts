import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../../models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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
/*constante que devuelve un open que a su vez tiene que devolver un afterClose que nos va a devolver un observable.
El observable lo ejecutamos con "of()"" y el valor que se quiere devolver. Cuando afterClosed devuelve un observable
que es de tipo booleano. Si es true va a ejecutar el clearListCartBook que es lo que se ha roto al 
incluir el MatDialog */
const MatDialogMock = {
    open(){
        return{
            afterClosed: ()=> of(true)
        };
    }
}

describe('Cart.component', () => {

    let component: CartComponent;//declaramos el componente de tipo que queremos testear y lo importamos
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
                BookService,
                //CartComponent
                {
                    provide: MatDialog,  useValue: MatDialogMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });
    //En el cart.component en ngOnInit se esta llamando al servicio
    /*ngOnInit(): void {
        this.listCartBook = this._bookService.getBooksFromCart();
        this.totalPrice = this.getTotalPrice(this.listCartBook);
    }*/

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();//component ngOnit
        service = fixture.debugElement.injector.get(BookService);
        //de esta manera el onInit no esta llamando al servicio para testear
        spyOn(service, 'getBooksFromCart').and.callFake(()=> listBook);
    });
    it('should create', () => {
        //esperamos a que ocurra algo con expect. Que el componet este instanciado correctamente
        expect(component).toBeTruthy();
    });
    /*it('should create', inject([CartComponent], (testComponent: CartComponent) => {
        expect(testComponent).toBeTruthy()
    }));*/
    //Método a testear viene de cart.component.ts
    /*public getTotalPrice(listCartBook: Book[]): number {
        let totalPrice = 0;
        listCartBook.forEach((book: Book) => {
          totalPrice += book.amount * book.price;
        });
        return totalPrice;
      }*/
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
    //Método a testear viene de cart.component.ts
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
        //creamos una constante para no depender de la referencia a la lista que puede cambiar o no
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 3
        };

        //se llama espia al método y se cambia por otro método
        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);//se hace una llamada falsa. no llama al servicio real. El servicio esta fuera
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);
        
        //testeamos si realmente decrementa
        expect(book.amount).toBe(3);

        component.onInputNumberChange(action, book);

        //testeamos si realmente decrementa
        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();

    });
    /*public onClearBooks(): void {
        if (this.listCartBook && this.listCartBook.length > 0) {
          this._clearListCartBook();
        } else {
           console.log("No books available");
        }
      }
    
      private _clearListCartBook() {
        this.listCartBook = [];
        this._bookService.removeBooksFromCart();
      }*/
    
    //test private method
    //a un método privado no se puede acceder directamente. Provamos el método publico para poder acceder al privado
    it('onClearBooks works correctly', () => {
        //llamamos al spy para acceder a un método  privado. Se declara antes del método. El método se va a espiar y a llamar.
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();//cuando se llama a una lista llena hay que comprobar si se llama al método privado
        //espia y anula lo que haga el servicio
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
        component.listCartBook = listBook;//Se llama a la lista del carrito igualándola a la lista  de libros que se ha creado arriba
        console.log(component.listCartBook.lastIndexOf);
        component.onClearBooks();//llamamos al método

        console.log('after ' + component.listCartBook.lastIndexOf);
        //dos posibilidades para lo conseguir lo mismo
        expect(component.listCartBook.length).toBe(0);//comprobar que la lista se ha vaciado. La lista del carrito este a 0
        expect(component.listCartBook.length === 0).toBeTrue();//que la condición sea verdadera
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });
    it('_clearListCartBook works correctly', () => {

        const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
        component.listCartBook = listBook;
        component['_clearListCartBook']();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
    });
    /*error _dialog.open para hace un nuevo mock. Mirar const MatDialogMock
    en el método en que borra libros llama al método "open". Que se esta guardando en dialogRef que tiene un método 
    afterClosed que es un observable. Por lo que necesitaremos un return.
    public onClearBooks(): void {
        if(this.listCartBook?.length > 0){
          const dialogRef = this._dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: {
              title: '¿Etás seguro?',
              message: '¿Desea eliminar todos los productos del carrito?',
            }
          });
          dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
            if(dialogResult){
              this._clearListCartBook();
            }
          });
        }else {
           console.log("No books available");
        }
    }*/

    /*testing del título "el carro esta vacío". Cuando haya una lista no estará disponible.
     */
    it('The title "The cart is empty" is not diplayed when there is a list', () => {
        //añadimos una lista
        component.listCartBook = listBook;
        //detección de cambios
        fixture.detectChanges;
        //traemos el elemento. Como es un id utilizamos ``, pero puede ser una clase, una etiqueta(h5)
        const debugElement: DebugElement = fixture.debugElement.query(By.css(`titleCartEmpty`));
        //el elemento no debería existir, por tanto el expect va a indicar que el debugElement no va a estar instanciado
        expect(debugElement).toBeFalsy();
    });
    it('The title "The cart is empty" is displayed correctly when the list is empty', () => {
        //lista vacía
        component.listCartBook = [];
        //detección de cambios
        fixture.detectChanges();
        //traemos el debugElement
        const debugElement: DebugElement = fixture.debugElement.query(By.css(`titleCartEmpty`));
        //comprobamos que debugElement exista
        expect(debugElement).toBeFalsy();
        //comprobamos que debugElemeny exista y extraemos el texto
        if(debugElement){
            const element: HTMLElement = debugElement.nativeElement;
            expect(element.innerHTML).toContain("The cart is empty");
        }

    });

});
