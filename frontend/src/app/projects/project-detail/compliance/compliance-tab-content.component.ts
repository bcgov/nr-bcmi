import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Project } from '@models/project';
import { CollectionsArray } from '@models/collection';
import { LoggerService } from '@services/logger.service';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'app-compliance-tab-content',
  templateUrl: './compliance-tab-content.component.html',
  styleUrls: ['./compliance-tab-content.component.scss']
})
export class ComplianceTabContentComponent implements OnInit, OnDestroy {
  // public properties
  loading: boolean;
  project: Project;
  collections: CollectionsArray;
  nrcedLinkEnabled: boolean;

  sortField: string;
  sortAsc: boolean;
  sortDirection: number;

  // private fields
  private sub: Subscription;

  constructor(private readonly route: ActivatedRoute, private readonly logger: LoggerService, private readonly configService: ConfigService) { }

  ngOnInit(): void {
    this.loading = true;
    this.nrcedLinkEnabled = this.configService.checkFeatureFlag("nrced-link","true");
    this.sub = this.route.parent.data.subscribe({
      next: (data: { project: Project }) => this.parseData(data),
      error: (error) => this.logger.log(error),
      complete: () => this.loading = false
    })
  }

  parseData(data: {project: Project}): void {
    if (data.project?.collections) {
      this.project = data.project;
      this.collections = data.project.collections.compliance;

      // Default sort will be descending by date
      this.sortField = 'date';
      this.sortAsc = false;
      this.sortDirection = -1;
      this.loading = false;
    }
  }

  openNRCED() {
    window.open(this.configService.getNRCEDURL() + '/records;project=' + encodeURIComponent(this.project.name), '_blank');
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  sort(field: string) {
    // Reverse order if this is already sort field
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      // Ascending sort of the new field
      this.sortField = field;
      this.sortAsc = true;
    }
    this.sortDirection = this.sortAsc ? 1 : -1;
  }
}
