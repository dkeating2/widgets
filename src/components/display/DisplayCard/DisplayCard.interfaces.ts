export interface DisplayCardProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  left?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapseOpen?: boolean;
  children: React.ReactNode;
}
