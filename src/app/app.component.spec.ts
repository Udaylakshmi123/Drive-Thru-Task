import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Vertex, Lanes } from '../../constants';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  const mockVertices: Vertex[] = [
    {
      id: 0,
      name: 'Order',
      vertexType: 'SERVICE_POINT',
      isEntry: true,
      location: { coordinates: [1, 2] },
      adjacent: [
        {
          adjacentVertex: 1,
          interiorPath: []
        }
      ]
    },
    {
      id: 1,
      name: 'Cash',
      vertexType: 'SERVICE_POINT',
      isEntry: false,
      location: { coordinates: [3, 4] },
      adjacent: []
    }
  ];

  const mockLaneData: Lanes = {
    id:1,
    data: {
      id: '1',
      name: 'Lane 1',
      vertices: mockVertices
    }
  };

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['get']);
    mockApiService.get.and.returnValue(of(mockLaneData));

    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [{ provide: ApiService, useValue: mockApiService }]
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
    expect(component.paths[0].points).toBe('20,40 60,80');
  });

  it('should get correct color for vertex type', () => {
    expect(component.getColorByType('SERVICE_POINT')).toBe('blue');
    expect(component.getColorByType('PRE_MERGE_POINT')).toBe('orange');
    expect(component.getColorByType('LANE_MERGE')).toBe('green');
    expect(component.getColorByType('UNKNOWN')).toBe('gray');
  });

  it('should transform coordinates correctly', () => {
    expect(component.transformXY(2)).toBe(60); // 2*20 + 20 offset
  });
});
