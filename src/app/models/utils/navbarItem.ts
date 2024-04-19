import { Route } from "@angular/router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { RoutePermission } from "../../app-routing.module";

export interface NavBarIcon {
    title: string;
    active: boolean;
    icon6?: IconDefinition;
    icon4?: string;
    route: RoutePermission
}