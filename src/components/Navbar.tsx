
import React, { useState } from 'react';
import { Menu, X, ChevronDown, Book, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/AuthProvider';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/75 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold">HACHA</Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/#about" isActive={location.hash === '#about'}>About</NavLink>
            <NavLink href="/#menu" isActive={location.hash === '#menu'}>Menu</NavLink>
            <NavLink href="/#events" isActive={location.hash === '#events'}>Events</NavLink>
            <NavLink href="/#location" isActive={location.hash === '#location'}>Location</NavLink>
            <NavLink href="/support" isActive={location.pathname === '/support'}>
              <FileText className="w-4 h-4 mr-1" />
              Support
            </NavLink>
            <NavLink href="/clone-instructions" isActive={location.pathname === '/clone-instructions'}>
              <Book className="w-4 h-4 mr-1" />
              Template Guide
            </NavLink>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            {isAdmin && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin">Admin</Link>
              </Button>
            )}
            
            <ThemeToggle />
            
            <Button asChild>
              <Link to="/#booking">Book a Table</Link>
            </Button>
          </div>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full py-4">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/" className="text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>HACHA</Link>
                  <ThemeToggle />
                </div>
                
                <div className="flex flex-col space-y-4">
                  <MobileNavLink 
                    href="/#about" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/#menu" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Menu
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/#events" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Events
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/#location" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Location
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/support" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Support
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/clone-instructions" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Book className="w-4 h-4 mr-2" />
                    Template Guide
                  </MobileNavLink>
                  
                  <Separator className="my-2" />
                  
                  {isAdmin && (
                    <MobileNavLink 
                      href="/admin" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </MobileNavLink>
                  )}
                  
                  <Button className="mt-4 w-full" asChild>
                    <Link 
                      to="/#booking" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Book a Table
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children }) => {
  return (
    <Link
      to={href}
      className={cn(
        "inline-flex items-center text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, onClick, children }) => {
  return (
    <Link
      to={href}
      className="flex items-center text-lg font-medium py-2 hover:text-primary"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
