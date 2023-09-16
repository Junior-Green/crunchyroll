import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
   // component: , // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'alphabetical', // child route path
       // component: ChildAComponent, // child route component that the router renders
      },
      {
        path: 'popular',
      //  component: ChildBComponent, // another child route component that the router renders
      },
      {
        path: 'new',
       // component: ChildBComponent, // another child route component that the router renders
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
