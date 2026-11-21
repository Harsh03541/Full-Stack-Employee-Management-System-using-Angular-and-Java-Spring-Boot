import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';
@Component({
 selector:'app-root',standalone:true,imports:[RouterLink,RouterLinkActive,RouterOutlet],
 template:`
 <div class="layout">
  <aside class="sidebar">
   <a class="brand" routerLink="/">✦ <span>PeopleDesk<small>PEOPLE OPERATIONS</small></span></a>
   <p class="nav-title">WORKSPACE</p>
   <a routerLink="/" routerLinkActive="selected" [routerLinkActiveOptions]="{exact:true}">▦ &nbsp; Dashboard</a>
   <a routerLink="/employees" routerLinkActive="selected">♙ &nbsp; Employees</a>
   <div class="side-note"><b>People first.</b><p>Keep your team organized and moving forward.</p></div>
   <div class="admin">HK &nbsp; <span><b>Harsh K.</b><small>Administrator</small></span></div>
  </aside>
  <main><header>Workspace　/　<b>People Management</b><span>● System operational　　HK</span></header>
   <section class="content"><router-outlet /></section>
   <footer>© 2025 PeopleDesk <span>Built for better teams</span></footer>
  </main>
 </div>`
})
export class AppComponent {}
