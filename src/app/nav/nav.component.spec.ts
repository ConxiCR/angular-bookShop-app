import { NavComponent } from './nav.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

//Opción 1: Creamos RouterTestingModule
//creamos una clase falsa para no ensuciar el TestBed configurándolo
class ComponentTestRoute {}

describe('Nav Component', () => {

    let component: NavComponent
    let fixture: ComponentFixture<NavComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                //este módulo provee el router, por lo que no hay que definirlo en providers
                RouterTestingModule.withRoutes([
                    { path: 'home', component: ComponentTestRoute },
                    { path: 'cart', component: ComponentTestRoute }

                ]),
            ],
            declarations: [
                NavComponent,
            ],
            
            schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
    
        expect(component).toBeTruthy();
    });
    it('should navigate', () => {
        //obtener el router
        const router = TestBed.inject(Router)
        //Creamos un espia para que cuando llame al método navTo se llama correctamente al navigate
        const spy = spyOn(router, 'navigate');
        
        //navegamos a home y a cart. Definimo el parámetro
        component.navTo('home');
        expect(spy).toHaveBeenCalledWith(['/home']);

        //formato de la llamada:
        //navTo(path: string): void {this.router.navigate([`/${path}`]);}

        component.navTo('cart');
        expect(spy).toHaveBeenCalledWith(['/cart']);
    });
});

//Opción 2: Creamos un mock de un servicio Router que utilice el método navigate
//esta constante no hace nada pero sirve para testear el método navigate
/*const routerMock = {
    navigate(){}
}

fdescribe('Nav Component', () => {

    let component: NavComponent
    let fixture: ComponentFixture<NavComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                NavComponent,
            ],
            providers: [
                {
                    //pasamos dos propiedades, provide y el valor por defecto
                    provide: Router, useValue: routerMock
                }
            ],
            
            schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]

        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
    
        expect(component).toBeTruthy();
    });
    it('should navigate', () => {
        //obtener el router
        const router = TestBed.inject(Router)
        //Creamos un espia para que cuando llame al método navTo se llama correctamente al navigate
        const spy = spyOn(router, 'navigate');

        component.navTo('');
        expect(spy).toHaveBeenCalled();

        
        
    });
});*/