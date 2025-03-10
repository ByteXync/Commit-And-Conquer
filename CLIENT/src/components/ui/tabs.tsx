import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300",
        active: "border-blue-500 bg-blue-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabProps extends React.ComponentProps<"button">, VariantProps<typeof tabVariants> {
  isActive?: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ className, variant, isActive, onClick, children, ...props }) => {
  return (
    <button
      className={cn(tabVariants({ variant: isActive ? "active" : "default" }), className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex space-x-2">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<TabProps>, {
              isActive: index === activeTab,
              onClick: () => handleTabClick(index),
            });
          }
          return child;
        })}
      </div>
      <div className="mt-4">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export { Tabs, Tab };