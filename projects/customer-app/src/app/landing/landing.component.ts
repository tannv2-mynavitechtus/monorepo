import { Component, OnInit } from '@angular/core';
import { ToastService } from 'shared-ui';

interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isDark = false;
  billingInterval: 'monthly' | 'annual' = 'monthly';
  activeFaqIndex: number = -1;
  
  // Newsletter form model
  newsletterEmail = '';

  constructor(private toastService: ToastService) {}

  features: FeatureItem[] = [
    {
      title: 'Real-Time Insights',
      description: 'Track dynamic analytics dashboards and monitor critical product workflows as they occur.',
      iconName: 'activity'
    },
    {
      title: 'Global Performance',
      description: 'Benefit from global Edge CDN coverage with optimized load times and high uptime guarantees.',
      iconName: 'globe'
    },
    {
      title: 'Team Collaboration',
      description: 'Manage users, assign fine-grained roles, and collaborate seamlessly across workspaces.',
      iconName: 'users'
    },
    {
      title: 'Security Auditing',
      description: 'Enterprise grade logs, encrypted transport pipelines, and granular authorization controls.',
      iconName: 'shield'
    }
  ];

  faqs: FaqItem[] = [
    {
      question: 'How does the 14-day free trial work?',
      answer: 'You can sign up and use all the features of our Pro plan for 14 days without entering a credit card. At the end of the trial, you can choose to enter payment details to continue using Pro, or let your account transition to the Free plan.'
    },
    {
      question: 'Can I cancel or change plans at any time?',
      answer: 'Yes. You can upgrade, downgrade, or cancel your subscription plan directly from your account settings panel at any time. When cancelling, you will retain access to premium features until the end of your current billing period.'
    },
    {
      question: 'Do you offer discounts for annual plans?',
      answer: 'Yes! When choosing annual billing, you receive a discount of approximately 20% compared to monthly billing. The price for the Pro plan drops to $23/month (billed annually at $276/year).'
    },
    {
      question: 'Is my data secure on your platform?',
      answer: 'Security is our highest priority. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We run routine vulnerability assessments and comply with major security guidelines.'
    }
  ];

  ngOnInit() {
    this.isDark = document.body.classList.contains('dark-theme');
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleFaq(index: number) {
    if (this.activeFaqIndex === index) {
      this.activeFaqIndex = -1; // Collapse
    } else {
      this.activeFaqIndex = index; // Expand
    }
  }

  subscribeNewsletter() {
    if (!this.newsletterEmail.trim() || !this.newsletterEmail.includes('@')) {
      return;
    }

    this.toastService.success(`Thank you! We've sent a confirmation to ${this.newsletterEmail}.`);
    this.newsletterEmail = '';
  }
}
