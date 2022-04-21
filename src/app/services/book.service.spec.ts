import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';

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

describe('BookService', () => {

    let service: BookService;
    let httpMock: HttpTestingController;//peticiones mock, no reales

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
    //comprueba que getBook devuelva una lista de libros y sea un método get
    it('getBook return a list of books and does a get method',()=>{
        service.getBooks().subscribe((resp: Book[]) => {
            expect(resp).toEqual(listBook);
        });
        const req = httpMock.expectOne(environment.API_REST_URL + '/book');
        expect(req.request.method).toBe('GET');
        //simulación de la petición y va a devolver un observable
        req.flush(listBook);
    });
});