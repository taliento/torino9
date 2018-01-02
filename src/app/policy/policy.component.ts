import { Component } from '@angular/core';
import { PolicyService } from '../shared/services';

@Component({
  selector: 'app-policy',
  templateUrl: 'policy.component.html'
})
export class PolicyComponent {
  policy: any = null;

  constructor(private policyService: PolicyService) {
    this.policy = policyService.getCookiePolicy();
  }
}
