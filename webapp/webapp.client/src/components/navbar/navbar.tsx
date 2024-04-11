import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Profile } from "./profile";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UserContext } from "@/components/layout";

export function NavBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="flex sticky top-0 z-50 h-[56px] w-full items-center justify-center bg-secondary py-2">
      <div className="flex w-full max-w-4xl">
        <div className="flex flex-row w-full items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild={true}
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild={true}
                >
                  <Link to="/dashboard">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild={true}
                >
                  <Link to="/catalog">Certificate Catalog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {user !== null ? (
            <div className="flex flex-row gap-2 items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      asChild
                    >
                      <Link to="/my-profile">
                        <Profile />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      asChild
                    >
                      <Button
                        variant="outline"
                        onClick={() => {
                          localStorage.removeItem("user");
                          setUser(null);
                          navigate("/");
                        }}
                      >
                        Logout
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          ) : (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link to="/Login">Login</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </div>
    </div>
  );
}
