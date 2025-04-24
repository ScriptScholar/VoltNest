import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import Path from '../Common/Path';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate()
  const path = location.pathname;

  const hideFooterPaths = ['/login', '/register'];
  const shouldHideFooter =
    hideFooterPaths.includes(path) || path.startsWith('/product/');

  if (shouldHideFooter) return null;

  return (
    <div className="footer fixed-bottom d-block d-md-none bg-light border-top">
      <div className="container-fluid">
        <div className="row text-center py-2">
          <div className="col">
            <div className={location.pathname === Path.home ? "text_main" : "text-muted"} onClick={() => navigate(Path.home)}>
              <div>
                <HomeIcon />
              </div>
              <div>Home</div>
            </div>
          </div>
          <div className="col">
            <div className={location.pathname === Path.cart ? "text_main" : "text-muted"} onClick={() => navigate(Path.cart)}>
              <div>
                <ShoppingCartIcon />
              </div>
              <div>Cart</div>
            </div>
          </div>
          <div className="col">
            <div className={location.pathname === Path.orderlist ? "text_main" : "text-muted"} onClick={() => navigate(Path.orderlist)}>
              <div>
                <ShoppingBagIcon />
              </div>
              <div>Order</div>
            </div>
          </div>
          <div className="col">
            <div className={location.pathname === Path.profile ? "text_main" : "text-muted"} onClick={() => navigate(Path.profile)}>
              <div>
                <PersonIcon />
              </div>
              <div>Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
