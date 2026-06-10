import { Component, OnInit } from '@angular/core';

interface Transaction {
  id: string;
  name: string;
  email: string;
  date: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

interface StatItem {
  title: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  trend: number[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isDark = false;
  showNotificationsDropdown = false;
  showProfileDropdown = false;
  searchQuery = '';
  
  // Quick action form model
  quickTx = {
    name: '',
    email: '',
    product: 'Premium Plan Subscription',
    amount: 99,
    status: 'Completed' as 'Completed' | 'Pending' | 'Cancelled'
  };

  successToast = '';

  // Stats items
  stats: {
    revenue: StatItem;
    users: StatItem;
    sales: StatItem;
    conversion: StatItem;
  } = {
    revenue: {
      title: 'Total Revenue',
      value: '$148,250.00',
      numericValue: 148250,
      change: '+12.5%',
      isPositive: true,
      trend: [32, 35, 30, 42, 45, 52, 48, 56, 62, 59, 68, 75]
    },
    users: {
      title: 'Active Users',
      value: '12,480',
      numericValue: 12480,
      change: '+4.8%',
      isPositive: true,
      trend: [80, 82, 85, 87, 92, 95, 99, 102, 108, 112, 118, 124]
    },
    sales: {
      title: 'Total Sales',
      value: '8,940',
      numericValue: 8940,
      change: '+8.3%',
      isPositive: true,
      trend: [50, 52, 48, 58, 65, 70, 68, 72, 79, 75, 82, 89]
    },
    conversion: {
      title: 'Conversion Rate',
      value: '2.42%',
      numericValue: 2.42,
      change: '-0.15%',
      isPositive: false,
      trend: [2.5, 2.48, 2.45, 2.52, 2.55, 2.42, 2.38, 2.44, 2.49, 2.45, 2.46, 2.42]
    }
  };

  // 12 months label & revenue values
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  revenueHistory = [12000, 15000, 13000, 18000, 22000, 25000, 21000, 26000, 31000, 29000, 35000, 42000];
  
  // Traffic sources
  traffic = [
    { source: 'Direct Traffic', percentage: 45, count: '5,616', color: '#3b82f6' },
    { source: 'Referral Link', percentage: 30, count: '3,744', color: '#10b981' },
    { source: 'Social Media', percentage: 15, count: '1,872', color: '#f59e0b' },
    { source: 'Email Campaign', percentage: 10, count: '1,248', color: '#ef4444' }
  ];

  // Transactions list
  transactions: Transaction[] = [
    { id: 'TX-1001', name: 'Olivia Martinez', email: 'olivia@example.com', date: '2026-06-10', product: 'Premium Plan Subscription', amount: 99.00, status: 'Completed' },
    { id: 'TX-1002', name: 'Jackson Miller', email: 'jackson@example.com', date: '2026-06-09', product: 'Developer Toolkit License', amount: 249.00, status: 'Pending' },
    { id: 'TX-1003', name: 'Sophia Chen', email: 'sophia@example.com', date: '2026-06-08', product: 'Enterprise Cloud Backup', amount: 1200.00, status: 'Completed' },
    { id: 'TX-1004', name: 'Liam Davies', email: 'liam@example.com', date: '2026-06-07', product: 'Custom Training Suite', amount: 750.00, status: 'Cancelled' },
    { id: 'TX-1005', name: 'Emma Wilson', email: 'emma@example.com', date: '2026-06-06', product: 'Premium Plan Subscription', amount: 99.00, status: 'Completed' }
  ];

  // Notifications
  notifications = [
    { text: 'New signup: Sarah Connor joined the platform', time: '5m ago', unread: true },
    { text: 'Monthly payout successfully processed', time: '2h ago', unread: true },
    { text: 'Database backup completed', time: '1d ago', unread: false }
  ];

  ngOnInit() {
    // Detect dark theme from body class (if already present)
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

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.unread = false);
  }

  getFilteredTransactions(): Transaction[] {
    if (!this.searchQuery.trim()) {
      return this.transactions;
    }
    const query = this.searchQuery.toLowerCase();
    return this.transactions.filter(tx => 
      tx.name.toLowerCase().includes(query) ||
      tx.id.toLowerCase().includes(query) ||
      tx.product.toLowerCase().includes(query) ||
      tx.status.toLowerCase().includes(query)
    );
  }

  addTransaction() {
    if (!this.quickTx.name || !this.quickTx.amount) {
      return;
    }

    const newTxId = `TX-${1000 + this.transactions.length + 1}`;
    const newTx: Transaction = {
      id: newTxId,
      name: this.quickTx.name,
      email: this.quickTx.email || `${this.quickTx.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      date: new Date().toISOString().split('T')[0],
      product: this.quickTx.product,
      amount: Number(this.quickTx.amount),
      status: this.quickTx.status
    };

    // Add to top of transactions list
    this.transactions = [newTx, ...this.transactions];

    // Recalculate metrics dynamically
    if (this.quickTx.status === 'Completed') {
      // Add revenue
      this.stats.revenue.numericValue += newTx.amount;
      this.stats.revenue.value = `$${this.stats.revenue.numericValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      
      // Update monthly chart values (increase the last month by the transaction amount)
      this.revenueHistory[this.revenueHistory.length - 1] += newTx.amount;
      this.stats.revenue.trend[this.stats.revenue.trend.length - 1] += Math.round(newTx.amount / 50);
    }
    
    // Add sales count
    this.stats.sales.numericValue += 1;
    this.stats.sales.value = this.stats.sales.numericValue.toLocaleString();
    this.stats.sales.trend[this.stats.sales.trend.length - 1] += 1;

    // Add active users (simulated change)
    this.stats.users.numericValue += 1;
    this.stats.users.value = this.stats.users.numericValue.toLocaleString();
    this.stats.users.trend[this.stats.users.trend.length - 1] += 1;

    // Trigger success alert
    this.successToast = `Successfully added transaction ${newTxId} for $${newTx.amount}!`;
    setTimeout(() => {
      this.successToast = '';
    }, 4000);

    // Reset form inputs (preserve defaults)
    this.quickTx = {
      name: '',
      email: '',
      product: 'Premium Plan Subscription',
      amount: 99,
      status: 'Completed'
    };

    // Add notification
    this.notifications = [
      { text: `New sale: $${newTx.amount} from ${newTx.name}`, time: 'Just now', unread: true },
      ...this.notifications
    ];
  }

  // Helper to calculate main line SVG path: width 800, height 200
  getLineChartPath(): string {
    const width = 800;
    const height = 180;
    const padding = 20;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;
    
    const minVal = Math.min(...this.revenueHistory) * 0.8;
    const maxVal = Math.max(...this.revenueHistory) * 1.1;
    const valRange = maxVal - minVal;

    let path = '';
    const pointsCount = this.revenueHistory.length;

    this.revenueHistory.forEach((val, i) => {
      const x = padding + (i / (pointsCount - 1)) * chartWidth;
      const ratio = (val - minVal) / valRange;
      // Invert Y since (0,0) is top-left
      const y = height - padding - ratio * chartHeight;

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        // Curve connection using Bezier
        const prevX = padding + ((i - 1) / (pointsCount - 1)) * chartWidth;
        const prevRatio = (this.revenueHistory[i - 1] - minVal) / valRange;
        const prevY = height - padding - prevRatio * chartHeight;
        
        const cpX1 = prevX + chartWidth / (pointsCount - 1) / 3;
        const cpY1 = prevY;
        const cpX2 = x - chartWidth / (pointsCount - 1) / 3;
        const cpY2 = y;

        path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
      }
    });

    return path;
  }

  // Helper to calculate fill area path for main chart
  getAreaChartPath(): string {
    const width = 800;
    const height = 180;
    const padding = 20;
    const chartWidth = width - padding * 2;

    const linePath = this.getLineChartPath();
    if (!linePath) return '';

    const firstX = padding;
    const lastX = width - padding;

    // Complete the area by dropping to the bottom-right and returning to the bottom-left
    return `${linePath} L ${lastX} ${height} L ${firstX} ${height} Z`;
  }

  // Get specific coordinates of dots on the line for tooltip and hover targets
  getChartPoints(): Array<{ x: number, y: number, month: string, value: number }> {
    const width = 800;
    const height = 180;
    const padding = 20;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;

    const minVal = Math.min(...this.revenueHistory) * 0.8;
    const maxVal = Math.max(...this.revenueHistory) * 1.1;
    const valRange = maxVal - minVal;

    return this.revenueHistory.map((val, i) => {
      const x = padding + (i / (this.revenueHistory.length - 1)) * chartWidth;
      const ratio = (val - minVal) / valRange;
      const y = height - padding - ratio * chartHeight;
      return { x, y, month: this.months[i], value: val };
    });
  }

  // Helper to generate sparkline path for mini-cards: width 100, height 40
  getSparklineSvgPath(trend: number[]): string {
    const width = 110;
    const height = 35;
    const minVal = Math.min(...trend);
    const maxVal = Math.max(...trend);
    const valRange = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    let path = '';
    trend.forEach((val, i) => {
      const x = (i / (trend.length - 1)) * width;
      const ratio = (val - minVal) / valRange;
      const y = height - 2 - ratio * (height - 4); // Keep boundaries

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    return path;
  }
}
