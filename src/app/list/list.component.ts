import { ApiService } from './../services/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  inquiries: any[] = [];
  inquiry: any = {};
  returnedArray?: any[];
  modalRef?: BsModalRef;

  constructor(
    private apiService: ApiService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadInquries();
  }

  loadInquries() {
    this.apiService.getInquiries().subscribe(
      (data) => {
        if (data.status === 'success') {
          this.inquiries = data.data;
          this.returnedArray = this.inquiries.slice(0, 10);
        }
      },
      (err) => {
        this.inquiries = [];
        console.log(err);
      }
    );
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.inquiries.slice(startItem, endItem);
  }

  openModal(template: TemplateRef<any>, data: any) {
    this.inquiry = data;
    this.modalRef = this.modalService.show(template);
  }
}
