import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  viewOrderHistory(id: number) {
    this.router.navigate(['/orders', id.toString()]);
  }

  toggleActivation(user: User) {
    this.userService.toggleActivation(user).subscribe();
  }

  ngOnInit(): void {
    this.userService.getAllNonAdminUsers().subscribe((response) => {
      this.users = response;
    });
  }
}
