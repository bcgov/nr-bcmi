import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '@models/project';

@Pipe({
  standalone: false,
  name: 'projectTypeFilter'
})
export class ProjectTypeFilterPipe implements PipeTransform {

    transform(value: Project[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.type.toLowerCase().indexOf(q.toLowerCase()));
    }
}
