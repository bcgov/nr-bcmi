import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@services/project.service';
import { Api } from '@services/api';
import { LoggerService } from '@services/logger.service';
import { ActivatedRoute } from '@angular/router';
import { Home } from '@app/models/content/home';
import { FastFact } from '@app/models/content/fast-fact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numProjects: number;
  hostname: string;
  homeData: Home;
  fastFacts: FastFact[];

  constructor( private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private api: Api,
    private logger: LoggerService) 
  { }

  ngOnInit() {
    this.projectService.getAll().subscribe(
      data => { this.numProjects = data ? data.length : 0; },
      error => this.logger.log(error)
    );
    this.hostname = this.api.hostnameNRPTI;
    window.scrollTo(0, 0);

    this.activatedRoute.data.subscribe((response: any) => {
      this.homeData = response.homeData.home;
      this.fastFacts = response.homeData.facts;
      console.log(response);
    });
  }
}
