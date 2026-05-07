import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import {
  Container,
  Text,
  Badge,
} from "@neuctra/ui";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
} from "lucide-react";

const statCardsCode = `import React from "react";
import {
  Container,
  Text,
  Badge,
} from "@neuctra/ui";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
} from "lucide-react";

const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const isPositive = changeType === 'positive';
  
  return (
    <Container className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Text variant="body2" className="text-gray-600 mb-1">{title}</Text>
          <Text variant="h4" className="font-bold mb-2">{value}</Text>
          <div className="flex items-center gap-2">
            {change && (
              <Badge
                variant={isPositive ? "success" : "danger"}
                className="flex items-center gap-1"
              >
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {change}
              </Badge>
            )}
            <Text variant="body2" className="text-gray-500">vs last month</Text>
          </div>
        </div>
        <div className={\`w-12 h-12 rounded-lg flex items-center justify-center \${color}\`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Container>
  );
};

export default function StatCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-blue-500"
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180",
      changeType: "positive",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "-19%",
      changeType: "negative",
      icon: ShoppingCart,
      color: "bg-purple-500"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+2.5%",
      changeType: "positive",
      icon: Activity,
      color: "bg-orange-500"
    }
  ];

  return (
    <Container className="space-y-6">
      <div className="mb-6">
        <Text variant="h4" className="mb-2">Dashboard Overview</Text>
        <Text variant="body1" className="text-gray-600">
          Key performance indicators for your business
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </Container>
  );
}`;

const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const isPositive = changeType === 'positive';
  
  return (
    <Container className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Text variant="body2" className="text-gray-600 mb-1">{title}</Text>
          <Text variant="h4" className="font-bold mb-2">{value}</Text>
          <div className="flex items-center gap-2">
            {change && (
              <Badge
                variant={isPositive ? "success" : "danger"}
                className="flex items-center gap-1"
              >
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {change}
              </Badge>
            )}
            <Text variant="body2" className="text-gray-500">vs last month</Text>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Container>
  );
};

const StatCardsPreview = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-blue-500"
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180",
      changeType: "positive",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "-19%",
      changeType: "negative",
      icon: ShoppingCart,
      color: "bg-purple-500"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+2.5%",
      changeType: "positive",
      icon: Activity,
      color: "bg-orange-500"
    }
  ];

  return (
    <Container className="space-y-6">
      <div className="mb-6">
        <Text variant="h4" className="mb-2">Dashboard Overview</Text>
        <Text variant="body1" className="text-gray-600">
          Key performance indicators for your business
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </Container>
  );
};

export default function TemplateStatCards() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Text variant="h3" className="mb-2">Stat Cards Template</Text>
        <Text variant="body1" className="text-gray-600 max-w-2xl mx-auto">
          Responsive stat cards displaying key metrics with trend indicators and icons.
          Perfect for dashboard analytics and KPI tracking.
        </Text>
      </div>

      <CodePreviewBlock
        code={statCardsCode}
        language="jsx"
        previewContent={<StatCardsPreview />}
      />
    </div>
  );
}
