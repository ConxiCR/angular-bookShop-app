import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import { Key } from 'protractor';

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

        //espia con un callFake para que no llame en realidad. Devuelve key si existe devuelve storage sino devuelve null
        spyOn(localStorage, 'getItem').and.callFake((key:string) => {
            return storage[key] ? storage[key] : null;
        })
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
    

});