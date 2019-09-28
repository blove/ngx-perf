import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material';
import { SharedModule } from '../../shared';
import { CantinaComponent } from './containers/cantina/cantina.component';
import { MosEisleyRoutingModule } from './mos-eisley-routing.module';

@NgModule({
  declarations: [CantinaComponent],
  imports: [CommonModule, MaterialModule, MosEisleyRoutingModule, SharedModule]
})
export class MosEisleyModule {}
