import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { IonicStorageModule } from '@ionic/storage'


describe('UserService', async() => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserService],
      declarations: [ ],
      imports: [HttpClientModule, IonicStorageModule.forRoot()]
    }).compileComponents();
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
