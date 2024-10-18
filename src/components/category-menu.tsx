"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CategoryMenu } from "@/schemas/category.schema"



interface NavigationMenuProps {
  categories?: CategoryMenu[] | undefined;
}

// Responsive Navigation Menu Component that accepts categories as a prop
export const NavigationMenuComponent: React.FC<NavigationMenuProps> = ({ categories }) => {
  if(!categories) return <></>;
  return (
    <NavigationMenu>
      <NavigationMenuList >
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              {category.children && category.children.length > 0 ? (
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {category.children.map((child) => (
                    <ListItem key={child.id} item={child} />
                  ))}
                </ul>
              ) : (
                <Link href={category.name}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {category.name}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// ListItem Component to handle subcategories recursively
const ListItem: React.FC<{ item: CategoryMenu }> = ({ item }) => (
  <li >
    <NavigationMenuLink asChild>
      <Link href={item.name}>
        <div
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
        >
          <div className="text-sm font-medium leading-none">{item.name}</div>
          {item.children && item.children.length > 0 && (
            <ul className="ml-4">
              {item.children.map((subitem) => (
                <ListItem key={subitem.id} item={subitem} />
              ))}
            </ul>
          )}
        </div>
      </Link>
    </NavigationMenuLink>
  </li>
)
