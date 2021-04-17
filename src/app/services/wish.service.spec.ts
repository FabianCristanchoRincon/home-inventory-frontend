import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { WishService } from './list.service';
import { IonicStorageModule } from '@ionic/storage'

describe('WishService', () => {
  let service: WishService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WishService],
      declarations: [ ],
      imports: [HttpClientModule, IonicStorageModule.forRoot()]
    }).compileComponents();
    service = TestBed.inject(WishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
