import { ReduceTextPipe } from './reduce-text.pipe';


describe('ReduceTextPipe', () => {

    let pipe: ReduceTextPipe;
    
    beforeEach(() => {
        pipe = new ReduceTextPipe;
    });
    it('should create', () => {
         expect(pipe).toBeTruthy();
    });
    it('use transform', ()=> {
        const text = 'Hello this is a text to check the Pipe';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);
    });
});