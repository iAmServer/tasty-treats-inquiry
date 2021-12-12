import { ApiService } from './services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tasty-treats';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.testServer();
  }

  testServer() {
    this.api.testServer().subscribe((data) => {
      console.log(data);
    });
  }
}
