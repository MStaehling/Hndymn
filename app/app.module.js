"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home.component");
var search_component_1 = require("./search.component");
var submit_component_1 = require("./submit.component");
var stops_component_1 = require("./stops.component");
var router_1 = require("@angular/router");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot([
                { path: 'stops/:id', component: stops_component_1.StopsComponent },
                { path: 'stops', component: stops_component_1.StopsComponent },
                { path: 'submit', component: submit_component_1.SubmitComponent },
                { path: 'search', component: search_component_1.SearchComponent },
                { path: '**', component: home_component_1.HomeComponent }
            ])],
        declarations: [app_component_1.AppComponent, stops_component_1.StopsComponent, search_component_1.SearchComponent, submit_component_1.SubmitComponent, home_component_1.HomeComponent],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map