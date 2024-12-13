import { NgModule } from "@angular/core";
import { OverviewComponent } from "./overview/overview.component";
import { StatsComponent } from "./stats/stats.component";
import { RouterModule, Routes } from "@angular/router";
import { canActivate } from "../RouteGuards/authGuard";

const routes: Routes = [
  {
    path: "",
    canActivate: [canActivate],
    children: [
      {
        path: "overview",
        component: OverviewComponent,
      },
      {
        path: "stats",
        component: StatsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashBoardRouteModule {}
