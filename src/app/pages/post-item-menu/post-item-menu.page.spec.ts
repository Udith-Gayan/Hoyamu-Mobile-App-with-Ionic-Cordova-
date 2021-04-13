import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostItemMenuPage } from './post-item-menu.page';

describe('PostItemMenuPage', () => {
  let component: PostItemMenuPage;
  let fixture: ComponentFixture<PostItemMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItemMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostItemMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
