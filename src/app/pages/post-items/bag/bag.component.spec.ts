import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BagComponent } from './bag.component';

describe('BagComponent', () => {
  let component: BagComponent;
  let fixture: ComponentFixture<BagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
