/*Important note:-

THIS MODULE IS NOT USED AT ALL, TO MAKE DROPDOWNS WROK WE USED TEST DIRECTIVE.

*/
import{Directive,OnInit,ElementRef,Renderer2,HostListener, HostBinding} from '@angular/core';
@Directive({
    selector:'[appDropdown]',
    exportAs:'appDropdown'
})
export class DropdownDirective implements OnInit{
    /*
    var1:boolean=false;
    constructor(private elRef:ElementRef,private renderer:Renderer2){}
    
    @HostListener('click')mousenter(){
        console.log("yes");
        console.log(this.elRef);
        this.var1=!this.var1
        if(this.var1){
            this.renderer.addClass(this.elRef.nativeElement,'show');
            console.log("click1");
        }
        else{
            this.renderer.removeClass(this.elRef.nativeElement,'show');
            console.log("click2");
        }
    }*/
private isOpen = false;
 
  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }
 
  @HostListener('click')
  onClick() {
    const dropdown = this.elementRef.nativeElement.nextElementSibling;
    if (!this.isOpen) {
      this.renderer.addClass(dropdown, 'show');
    } else {
      this.renderer.removeClass(dropdown, 'show');
    }
    this.isOpen = !this.isOpen;
  }
    ngOnInit(){}
}