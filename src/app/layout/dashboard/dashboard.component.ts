import { Component, OnInit } from '@angular/core';
import { slideToBottom } from '../../router.animations';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [slideToBottom()]
})
export class DashboardComponent implements OnInit {
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];
  numtask: number;

  constructor(
    private serviceWorkspaces: WorkspacesService,
  ) {
    this.sliders.push(
      {
        imagePath: 'assets/images/slider1.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider2.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider3.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider4.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider5.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider6.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider7.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider8.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider9.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider10.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      }
    );

    this.alerts.push(
      {
        id: 1,
        type: 'success',
        message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
      },
      {
        id: 2,
        type: 'warning',
        message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
      }
    );
    this.numtask = 0;
  }

  ngOnInit() {
    this.serviceWorkspaces.GetPendingTasksUser().subscribe(
      (response: any) => {
        this.numtask = response.length;
      }
    );
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
