export type SidebarItem = {
  title: string;
  icon: React.ComponentType;
  url: string;
  disabled?: boolean;
  target?: string;
};

export type SidebarGroup = {
  title?: string;
  items: SidebarItem[];
};
