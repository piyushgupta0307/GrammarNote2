import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {

  @ViewChild("presentaionFrom") presentaionFrom: NgForm;
  @ViewChild("handoutsFrom") handoutsFrom: NgForm;
  @ViewChild("videoWrapper") videoWrapper: ElementRef;

  private data: any;
  private assetsPath: string = "../../assets/";
  private ppt: string = "";
  private handouts: string = "";
  private keynotes:string="";
  closePreTab: boolean = true;
  closeHangoutsTab: boolean = true;
  showWrapper: boolean = false;

  framePath: any = this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/images/image78.png");
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private renderer: Renderer2) { }

  ngOnInit() {

    this.http.get(this.assetsPath + "data/data.json").subscribe((data) => {
      this.data = data;
    }, (error) => {
      console.log(error);
    });

  }

  changeFrame(index) {
    var frame = this.data[index];
    var video = this.assetsPath + frame["video"];
    this.ppt = frame["ppt"];
    this.handouts = frame["handouts"];
    this.keynotes=frame["keynotes"];
   
    this.framePath = this.domSanitizer.bypassSecurityTrustResourceUrl(video);
    document.getElementById("iframe").onload = this.align;
    this.createResier();

  }
  createResier() {
    const a = this.renderer.createElement("a");
    this.renderer.listen(a, "click", () => {
      this.showWrapper = true;
    });
    this.renderer.setAttribute(a, "id", "resizer");
    this.renderer.appendChild(this.videoWrapper.nativeElement, a);


  }
  align() {
    const doc = (<HTMLIFrameElement>document.getElementById("iframe")).contentWindow.document;
    const container = doc.getElementById("animation_container");
    const canvas = doc.getElementById("canvas");
    const dom_overlay_container = doc.getElementById("dom_overlay_container");

    container.style.width = "350px";
    container.style.height = "215px";

    canvas.style.width = "350px";
    canvas.style.height = "212px";

    dom_overlay_container.style.width = "350px";
    dom_overlay_container.style.height = "212px";

  }
  downloadPresentaion() {
    
    const type = this.presentaionFrom.value["downloadPresenation"];
    if (type !=="keynotes" && this.ppt) {
  location.href = (<string>this.assetsPath + "ppt/" + type + "/level_2/" + this.ppt);
    }
   
    if(type==="keynotes" && this.keynotes)
    {
      //console.log(this.assetsPath + "keynotes/level_2/" + this.keynotes)
      location.href = (<string>this.assetsPath + "keynotes/level_2/" + this.keynotes+".zip");

    }
    else {
      return false;
    }
  }
  downloadHandouts() {

    const type = this.handoutsFrom.value["handouts"];
    if (type && this.handouts) {
      location.href = (<string>this.assetsPath + "handouts/level_2/" + this.handouts + type + ".doc");
    }
    else {
      return false;
    }
  }


}
