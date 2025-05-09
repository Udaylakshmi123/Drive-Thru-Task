import { Component,OnInit } from '@angular/core';
import { ApiService } from './api.service';
import {reqUrl,Vertex,getLanesData,Lanes} from '../../constants';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [FormsModule,MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  selectedValue = '1';
  lanes = getLanesData();
  vertices: Vertex[] = [];
  paths: { points: string; color: string }[] = [];
  scale = 25;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(){
    this.onSelectionChange()
  }
  // based on select lane change respective lane generated
  onSelectionChange(){
    this.apiService.get(reqUrl,Number(this.selectedValue)).subscribe({next: (response:Lanes) => {
      this.vertices=response.data.vertices;
      this.generatePaths();
    }, error: ()=>{
      this.snackBar.open('Something Went Wrong', 'Close', { duration: 3000 })
    }});
  }
  // creating from(XY) & to(XY) coordinates to form a Polyline
  generatePaths(): void {
    this.paths=[];
    const vertexMap = new Map<number, Vertex>();
    this.vertices.forEach(v => vertexMap.set(v.id, v));
    this.vertices.forEach(vertex => {
      vertex.adjacent.forEach(adj => {
        const pathPoints = [vertex.location.coordinates];
        adj.interiorPath.forEach(p => pathPoints.push(p.coordinates));
        const dest = vertexMap.get(adj.adjacentVertex);
        if (dest) {
          pathPoints.push(dest.location.coordinates);
          const pointsStr = pathPoints
            .map(p => `${p[0] * this.scale},${p[1] * this.scale}`)
            .join(' ');
          const color = this.getColorByType(vertex.vertexType);
          this.paths.push({ points: pointsStr, color });
        }
      });
    });
  }

  getColorByType(type: string): string {
    switch (type) {
      case 'SERVICE_POINT':
        return 'blue';
      case 'PRE_MERGE_POINT':
        return 'orange';
      case 'LANE_MERGE':
        return 'green';
      default:
        return 'gray';
    }
  }

  getVertexColor(type: string): string {
    return this.getColorByType(type);
  }

  getLabelOffsetX(): number {
    return 20;
  }

  getLabelOffsetY(): number {
    return -20;
  }
}

