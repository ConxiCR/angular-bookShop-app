import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { of } from 'rxjs';


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
//objeto con los métodos que se necesitan del servicio. Si hubieran más se incorporarian
const BookServiceMock = {
    getBooks: () => of(listBook),
};
//mock pipe
@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform {
    transform(): string {
        return '';
    }
}

describe('home component', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            declarations:[
                HomeComponent,
                ReduceTextPipeMock
            ],
            providers:[
                //BookService //1ª opción

                //Mock Service //2ª opción
                //cuando el component necesite este servicio utilice el objeto creado del método `getBooks`
                //le decimos que en lugar de utilizar el `BookService`original utilice el que se ha creado
                {
                    provide: BookService,
                    useValue: BookServiceMock
                }
            ],

            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

        }).compileComponents();
    });
    //instancia componente
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    //confirmación de creación correcta
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    //el método se subscribe una vez
    /*public getBooks(): void {
        this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
          this.listBook = resp;
        });
      }*/
    it('getBooks get books from the subscription', () => {
        //1º traer  el servicio
        const bookService = fixture.debugElement.injector.get(BookService)
        //para probar la array vacia
        //const listBook: Book[] = [];
        //primero espiamos al método y luego va a devolver un observable de tipo listBook
        //con el nuevo servicio no se necesita este espia
        //const spy1 = spyOn(bookService,'getBooks').and.returnValue(of(listBook));
        component.getBooks();//si getBooks trae un array vacio

        //con el nuevo servicio no se necesita este expect
        //expect(spy1).toHaveBeenCalled();
        //expect(component.listBook.length).toBe(0);//array vacia
        expect(component.listBook.length).toBe(3);
    });
    //creación servicio mock para el caso de muchos métodos del mismo servicio






});