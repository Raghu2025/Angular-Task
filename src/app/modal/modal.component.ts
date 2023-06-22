import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private renderer:Renderer2,
    private eleRef:ElementRef
  ) { }

  ngOnInit(): void {
  }

  close(){
    const container = this.eleRef.nativeElement
    container.remove()
  }

}
