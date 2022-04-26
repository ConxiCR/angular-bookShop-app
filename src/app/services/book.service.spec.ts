import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import swal from 'sweetalert2';

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
const book: Book =  {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
};


fdescribe('BookService', () => {

    let service: BookService;
    let httpMock: HttpTestingController;//peticiones mock, no reales
    let storage = {};//localStorage vacio

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });
    //instancia httpMock
    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
        //reseteo del storage para que la información de un test no afecte al siguiente test
        storage = {};

        //espia con un callFake para que no llame en realidad. Devuelve key si existe devuelve storage sino devuelve null
        spyOn(localStorage, 'getItem').and.callFake((key:string) => {
            return storage[key] ? storage[key] : null;
        })
        //espia para el setItem que hace? primero pasa la key y luego un json
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
            return storage[key] = value;
        });
    });
    //evita que no haya peticiones pendientes entre cada test. No lanza el siguiente test mientras haya una petición pendiente
    afterEach(() => {
        httpMock.verify();
    });
    it('should create', () => {
        expect(service).toBeTruthy();
    });
    /*public getBooks(): Observable<Book[]> {
    const url: string = environment.API_REST_URL + `/book`;
    return this._httpClient.get<Book[]>(url);
    }*/
    //comprueba que getBook devuelva una lista de libros y sea un método get. Un método que conecta con una API
    it('getBook return a list of books and does a get method',()=>{
        service.getBooks().subscribe((resp: Book[]) => {
            expect(resp).toEqual(listBook);
        });
        const req = httpMock.expectOne(environment.API_REST_URL + '/book');
        expect(req.request.method).toBe('GET');
        //simulación de la petición y va a devolver un observable
        req.flush(listBook);
    });
    //métodos en el localStorage
    /*public getBooksFromCart(): Book[] {
    let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    if (listBook === null) {
      listBook = [];
    }
    return listBook;s
    }*/
    //método que devuelve una array de libros book[] a partir de un localStorage
    //localStorage nos devuelve un json.parse para el json pasarle a un objeto
    //comprobaremos que nos devuelva una array vacia cuando el carrito este vacio
    //en el beforeEach creamos un spy para que la llamada no sea real
    //creamos espias para simular localStorage y no envie datos reales
    it('getBooksFromCart return empty array when localStorage is empty', () => {
        const listBook = service.getBooksFromCart();//lista de libros. Como no se ha hecho ningún localStorage deberia ser null y devolver un array vacio
        expect(listBook.length).toBe(0);
        
    });
    /*public addBookToCart(book: Book) {
    let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    if (listBook === null) { // Create a list with the book
      book.amount = 1;
      listBook = [ book ];
    } else { 
      const index = listBook.findIndex((item: Book) => {
        return book.id === item.id;
      });
      if (index !== -1) { // Update the quantity in the existing book
        listBook[index].amount++;
      } else { 
        book.amount = 1;
        listBook.push(book);
      }
    }
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    this._toastSuccess(book);
  }*/
  //método que comprueba antes de añadir al carrito si el libro existe en localStorage
  //1o. testear caso: cuando la lista no existe añadir un libro
    it('addBookToCart add a book when the list doesnt exist in the localStorage', () => {
        //se crea un objeto con un método fire que devuelva null
        const toast = {
            fire: () => null
        } as any;//as any para que no de error en el objeto toast
        //el método mixin va a devolver un objeto toast que tiene un método fire que es null
        const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
            return toast;
        });
        //el método fire no puede existir en null por lo que se ha de devolver un objeto que tenga como método .fire(mirar error)
        //1º traemos la lista de libros
        let listBook = service.getBooksFromCart();
        //en este caso la lista tendria que ser 0
        expect(listBook.length).toBe(0);
        //enviar libro
        
        service.addBookToCart(book);
        //como hemos añadido un libro en este caso ya tenemos 1 libro
        listBook = service.getBooksFromCart();  
        expect(listBook.length).toBe(1);
        expect(spy1).toHaveBeenCalled();//llamamos al spy1 y se comprueba que haya sido llamado correctamente

    });
    it('addBookToCart add a book when the list exist in the localStorage', () => {
   
        const toast = {
            fire: () => null
        } as any;
        const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
            return toast;
        });
        
        let listBook = service.getBooksFromCart();
    
        expect(listBook.length).toBe(0);
        
        service.addBookToCart(book);
        listBook = service.getBooksFromCart();  
        expect(listBook.length).toBe(1);
        service.addBookToCart(book);
        expect(spy1).toHaveBeenCalled();

    });


});