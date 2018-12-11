import { Directive, HostListener, ElementRef, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizer]'
})
export class ResizerDirective {



constructor(private element:ElementRef,private renderer:Renderer2) { }

@HostListener("mouseenter") mouseover()
{
console.log("mouseenter");
var div=document.createElement("div");
div.setAttribute("id","resizer");

this.renderer.appendChild(this.element.nativeElement,div);
this.renderer.listen(div,"click",()=>{
  alert("ssss");
})
}

@HostListener("mouseleave") mouseout()
{
  console.log("mouseleave");
  var div=document.getElementById("resizer");
  if(div)
  {
   // this.renderer.
  
    this.renderer.removeChild(this.element.nativeElement,div);
  }
}



}
