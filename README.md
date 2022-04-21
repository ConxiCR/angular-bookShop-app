# angular-bookShop-app
app to do unit tests with Jasmine and Karma

## Getting started backend

Install JSON Server

    npm install -g json-server

Create db.json file with some data

Start JSOn Server

    json-server --watch db.json

## Getting started front-end

    npm start

## start testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

    ng test

- in each file .spec will create a describe and .
- We will create a file for a each component p.e. cart.
     rute src/app/pages/cart/cart.component.spec.ts
- Create file coverage
    ng test --code-coverage

### important ###
>Los test no siempre se relizan paralelamente
>
# BookShopApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## structure
 imports {}
 describe('',()=> {
     beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule//no es una petición real
            ],
            declarations: [
                component???
            ],
            providers: [
                service???
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();//component ngOnit
        service = fixture.debugElement.injector.get(BookService);
    });
    it('should create', () => {
        
        expect(component).toBeTruthy();
    });
    //test method with return
    it('getTotalPrice returns and amount', () => {
        const totalPrice = component.getTotalPrice(listBook);

        expect(totalPrice).toBeGreaterThan(0);
        //no va a ser 0
        expect(totalPrice).not.toBe(0);
        //no va a ser nulo. Con el not delante se hace la negación del método
        expect(totalPrice).not.toBeNull();
    });
    it('onInputNumberChange decrements correctly', () => {
        
        const action = 'minus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 3
        };
        *** llamada a un servicio con spy ***
        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);//se hace una llamada falsa. no llama al servicio real. El servicio esta fuera. Cuando el servicio se llama dentro del componente no se puede aplicar el `callFake`
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);
        
        //testeamos si realmente decrementa
        expect(book.amount).toBe(3);

        component.onInputNumberChange(action, book);

        //testeamos si realmente decrementa
        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();

    });
 })

Los spy's se tienen que llamar antes de los  métodos.

//se llama espia al método y se cambia por otro método
    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);

//llamamos al spy para acceder a un método  privado. Se declara antes del método. El método se va a espiar y a llamar.
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
