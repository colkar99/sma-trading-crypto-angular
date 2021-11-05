import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      {path: 'list',component: ListComponent}
      // { path: 'myOrders', loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersModule) },
      // { path: 'myAppointments', loadChildren: () => import('./my-appointments/my-appointments.module').then(m => m.MyAppointmentsModule) },
      // { path: 'homeBookAppt', loadChildren: () => import('./home-book-appt/home-book-appt.module').then(m => m.HomeBookApptModule) },
      // { path: 'myProfile', loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule) },
      // { path: 'myHistory', loadChildren: () => import('./my-history/my-history.module').then(m => m.MyHistoryModule) },
      // { path: 'myMedicalRecord', loadChildren: () => import('./my-medical-record/my-medical-record.module').then(m => m.MyMedicalRecordModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
