import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormComponent } from "./form.component";


describe('Form component', () => {

    let component: FormComponent
    let fixture: ComponentFixture<FormComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [
                FormComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

        }).compileComponents();
        
    });
    beforeEach(()=>{
        fixture = TestBed.createComponent(FormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('name fild is required', () => {
        //obtener el campo name del formulario. El método get trae el campo del formulario que indicamos
        const nameField = component.form.get('name')
        //seteamos un campo de un string vacío. El campo
        nameField.setValue('')
        //si valid es igual a false
        expect(nameField.valid).toBeFalse()
    });
    //comprobamos error cuando el "name" > 5 caracteres
    it('name fild has an error with more than 5 characters', () => {
        const nameField = component.form.get('name')
        nameField.setValue('test name')
        expect(nameField.valid).toBeFalse()
    });
    it('name fild has an error with less than 5 characters', () => {
        const nameField = component.form.get('name')
        nameField.setValue('Ana')
        expect(nameField.valid).toBeTrue()
    });
    it('email fild is required', () => {
        const emailField = component.form.get('email')
        emailField.setValue('')
        expect(emailField.valid).toBeFalse()
    });
    it('email must be valid', () => {
        const emailField = component.form.get('email')
        emailField.setValue('test@')
        expect(emailField.valid).toBeFalse()
        emailField.setValue('test@test.com')
        expect(emailField.valid).toBeTrue()
    });
    it('form is valid', () => {
        const nameField = component.form.get('name')
        const emailField = component.form.get('email')
        nameField.setValue('Ana')
        emailField.setValue('test@test.com')
        expect(component.form.valid).toBeTrue()
    })
});
