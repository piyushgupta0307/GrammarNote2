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
  @ViewChild("paginate") paginate: any;

  public data: any;
  private assetsPath: string = "../../assets/";
  private ppt: string = "";
  public handouts: any = "";
  private keynotes: string = "";
  private isHandouts: any = null;
  public notHandouts: any = null;
  closePreTab: boolean = true;
  closeHangoutsTab: boolean = true;
  showWrapper: boolean = false;
  private changeStatus: boolean = false;
  public p: any = null;
  public downloadPresenation: any = "presentations_for_windows";
  public downloadhandouts: any = "_oyo";

  framePath: any = this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/images/image78.png");
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private renderer: Renderer2) { }

  ngOnInit() {
    this.http.get(this.assetsPath + "data/data.json").subscribe((data) => {
      this.data = data;
      if (data) {
        this.ppt = this.data[0].ppt;
        this.keynotes = this.data[0].keynotes;
        this.handouts = this.data[0].handouts;
      }
    }, (error) => {
      console.log(error);
    });

  }

  changeFrame(index, page_num = null, dPPT, dHout) {
    this.isHandouts = '';
    this.notHandouts = '';
    if (dPPT != 'presentations_for_windows') {
      this.downloadPresenation = 'presentations_for_windows';
    }
    if (dHout != '_oyo') {
      this.downloadhandouts = '_oyo';
    }

    if (page_num == 2) {
      index = index + 20;
    }
    var frame = this.data[index];
    if (frame.handouts_options) {
      this.isHandouts = frame.handouts_options;
      this.downloadhandouts = '_prac';
    }
    if (frame.handouts) {
      this.notHandouts = frame.handouts;


    } else if (!frame.handouts_options) {
      this.closeHangoutsTab = true;
      this.notHandouts = "false";
    }

    var video = this.assetsPath + frame["video"];
    this.ppt = frame["ppt"];

    this.handouts = frame["handouts"];
    this.keynotes = frame["keynotes"];

    this.framePath = this.domSanitizer.bypassSecurityTrustResourceUrl(video);

  }
  downloadPresentaion() {

    const type = this.presentaionFrom.value["downloadPresenation"];
    if (type !== "keynotes" && this.ppt) {
      location.href = (<string>this.assetsPath + "ppt/" + type + "/level_2/" + this.ppt);
    }

    if (type === "keynotes" && this.keynotes) {
      location.href = (<string>this.assetsPath + "keynotes/level_2/" + this.keynotes + ".zip");

    }
    else {
      return false;
    }
  }
  downloadHandouts() {

    const type = this.handoutsFrom.value["downloadhandouts"];
    if (type && this.handouts) {
      location.href = (<string>this.assetsPath + "handouts/level_2/" + this.handouts + type + ".doc");
    }

    else if (type && this.isHandouts) {

      location.href = (<string>this.assetsPath + "handouts/level_2/" + this.isHandouts + ".doc");
    }
    else {
      return false;
    }
  }


}
