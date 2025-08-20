import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [CommonModule, NavbarComponent, SidebarComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true
})
export class LayoutComponent {}
