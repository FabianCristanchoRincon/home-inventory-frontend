import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage'
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";


import { RegisterPage } from './register.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [ UserService],
      declarations: [ RegisterPage ],
      imports: [IonicModule.forRoot(), HttpClientModule, IonicStorageModule.forRoot(), RouterModule, ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
