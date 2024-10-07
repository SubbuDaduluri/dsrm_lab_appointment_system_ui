import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LabService } from '../../../shared/services/lab.service';
import { AppLabResponse } from '../../../core/models/app.lab.response';
import { AppCommomModule } from '../../../shared/app.common.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-lab',
  standalone: true,
  imports: [AppCommomModule],
  templateUrl: './view-lab.component.html',
  styleUrl: './view-lab.component.scss'
})
export class ViewLabComponent implements OnInit, AfterViewInit {

  displayedColumns = ['seqId', 'labName', 'labAddress', 'contactNumber', 'emailAddress', 'actions'];
  dataSource = new MatTableDataSource<AppLabResponse>();
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private labService: LabService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;

    this.labService.getAll().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data;
        this.isLoadingResults = false;
      },
      error: error => {
        this.isLoadingResults = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editLabDetails(element: AppLabResponse) {
    this.labService.setLabInfo(element);
    this.router.navigate(['/home/labs/edit-lab'],{state: { labId: element.labId}});
  }

  createLab(){
    this.labService.setLabInfo(null);
    this.router.navigate(['/home/labs/add-lab']);
  }

}
