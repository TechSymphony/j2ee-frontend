"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CategoryMenu } from "@/schemas/category.schema";

interface NavigationMenuProps {
    categories?: CategoryMenu[] | undefined;
}

// Responsive Navigation Menu Component that accepts categories as a prop
export const CategoryMenuComponent: React.FC<NavigationMenuProps> = ({
    categories,
}) => {
    if (!categories) return <></>;
    return (
        <NavigationMenu>
            <NavigationMenuList
                className="
            flex-col justify-start gap-6 text-lg font-medium items-start 
            md:flex md:flex-row md:items-center md:grow md:justify-center md:gap-5 md:text-sm lg:gap-6"
            >
                {categories.map((category) => (
                    <NavigationMenuItem key={category.id} className="relative">
                        {category.children && category.children.length > 0 ? (
                            <>
                                <NavigationMenuContent>
                                    <ul className="min-w-4 md:whitespace-nowrap">
                                        {category.children.map((child) => (
                                            <ListItem
                                                key={child.id}
                                                item={child}
                                            />
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                                <NavigationMenuTrigger className="space-y-1 rounded-md leading-none no-underline outline-none transition-colors">
                                    <Link
                                        href={`/campaign?category.id=${
                                            category.id
                                        },${category.children
                                            .map((child) => child.id)
                                            .join(",")}`}
                                        legacyBehavior
                                        passHref
                                    >
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            {category.name}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuTrigger>
                            </>
                        ) : (
                            <Link
                                legacyBehavior
                                passHref
                                href={`/campaign?category.id=${category.id}`}
                                key={category.id}
                                className="text-muted-foreground"
                            >
                                {category.name}
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

// ListItem Component to handle subcategories recursively
const ListItem: React.FC<{ item: CategoryMenu }> = ({ item }) => (
    <li className="relative">
        <NavigationMenuLink asChild>
            <Link href={item.name}>
                <li
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pink-50  focus:bg-pink-50"
                    )}
                >
                    <NavigationMenuLink asChild>
                        <Link
                            href={`/campaign?category.id=${item.id}`}
                            className="text-muted-foreground block p-2 "
                        >
                            {item.name}
                        </Link>
                    </NavigationMenuLink>
                </li>
            </Link>
        </NavigationMenuLink>
    </li>
);
