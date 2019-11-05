import { Component, OnInit } from "@angular/core";
import { JwtHelper } from "../../helpers/jwt";
import { RoleModel } from "src/app/models/role.model";
import { LoginService } from "../../services/auth/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar-left",
  templateUrl: "./sidebar-left.component.html",
  styleUrls: ["./sidebar-left.component.scss"]
})
export class SidebarLeftComponent implements OnInit {
  rol: any;
  mostrarPanelAdmin: boolean;
  mostrarEntidad: boolean;
  mostrarTramites: boolean;
  navbarOpen: boolean[];
  listMenu: any;
  constructor(
    private roles: RoleModel,
    private serviceLogin: LoginService,
    private router: Router
  ) {
    this.mostrarPanelAdmin = false;
    this.mostrarEntidad = false;
    this.mostrarTramites = false;
    this.navbarOpen = [false, false, false, false, false, false];
    this.listMenu = [
      {
        titulo: "Tramites",
        subitems: [
          {
            subtitulo: "Tramite 1",
            link: "/inicio"
          },
          {
            subtitulo: "Tramite 2",
            link: "/inicio"
          },
          {
            subtitulo: "Tramite 3",
            link: "/inicio"
          }
        ]
      }
    ];
  }

  ngOnInit() {
    console.log("listMenu", this.listMenu);

    this.rol = JwtHelper.getUserPublicInformation();
    if (this.rol.hasOwnProperty("roles")) {
      const role = this.rol.roles.find(elem => {
        return elem._id === this.roles.Administrador;
      });
      if (role) {
        this.mostrarPanelAdmin = true;
      } else {
        this.mostrarPanelAdmin = false;
      }
    }
    if (this.rol.hasOwnProperty("roles")) {
      const role = this.rol.roles.find(elem => {
        return (
          elem._id === this.roles.Administrador ||
          elem._id === this.roles.Entidad
        );
      });
      if (role) {
        this.mostrarEntidad = true;
      } else {
        this.mostrarEntidad = false;
      }
    }
    if (this.rol) {
      this.mostrarTramites = true;
    }
  }
  logout() {
    this.serviceLogin.logout();
    this.router.navigate(["/inicio"]);
    window.location.reload();
  }
  toggleNavbar(id: number) {
    this.navbarOpen[id] = !this.navbarOpen[id];
  }
}
