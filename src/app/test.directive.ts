import { Directive,OnInit,ElementRef,Renderer2,HostListener} from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective{
  var1:boolean=false;
  constructor(private elRef:ElementRef,private renderer:Renderer2){}
  @HostListener('click')mousenter(){
    //console.log(this.elRef);
    //console.log("yes")
    this.var1=!this.var1;
    
    if(this.var1){
      this.renderer.addClass(this.elRef.nativeElement.lastChild,'show');
      //console.log("click1");
    }
    else{
      this.renderer.removeClass(this.elRef.nativeElement.lastChild,'show');
      //console.log("click2");
    }
  }
  /*
  @HostListener('document:click', ['$event']) toggleOpen(event:MouseEvent) {
    this.var1=false;
    this.renderer.removeClass(this.elRef.nativeElement.lastChild,'show');
  }*/
  
}
