import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Lanes, mockLanesData } from '../../constants';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  const mockLaneData: Lanes = mockLanesData();

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['get']);
    mockApiService.get.and.returnValue(of(mockLaneData));

    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [{ provide: ApiService, useValue: mockApiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load vertices and generate paths on selection change', () => {
    component.onSelectionChange();
    expect(component.vertices.length).toBe(2);
    expect(component.paths.length).toBe(1);
    expect(component.paths[0].points).toBe('25,50 75,100');
  });

  it('should get correct color for vertex type', () => {
    expect(component.getColorByType('SERVICE_POINT')).toBe('blue');
    expect(component.getColorByType('PRE_MERGE_POINT')).toBe('orange');
    expect(component.getColorByType('LANE_MERGE')).toBe('green');
    expect(component.getColorByType('UNKNOWN')).toBe('gray');
  });
});
