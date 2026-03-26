import User from "./user.model";
import Admin from "./admin.model";
import Role from "./role.model";
import Store from "./store.model";
import Outlet from "./outlet.model";
import Menu from "./menu.model";
import Permission from "./permission.model";
import State from "./state.model";
import City from "./city.model";
import Address from "./address.model";
import Category from "./category.model";
import Product from "./product.model";
import Cart from "./cart.model";
import Order from "./order.model";
import OrderItem from "./orderItem.model";
import Payment from "./payment.model";
import Review from "./review.model";
import Wishlist from "./wishlist.model";
import Tax from "./tax.model";

// Admin <-> Role
Role.hasMany(Admin, { foreignKey: "role_id" });
Admin.belongsTo(Role, { foreignKey: "role_id" });

// Role <-> Store (store-scoped custom roles)
Store.hasMany(Role, { foreignKey: "store_id" });
Role.belongsTo(Store, { foreignKey: "store_id" });

// Role created_by Admin
Role.belongsTo(Admin, { foreignKey: "created_by", as: "creator" });

// Store owner and creator (both FK to admins)
Admin.hasMany(Store, { foreignKey: "owner_id", as: "ownedStores" });
Store.belongsTo(Admin, { foreignKey: "owner_id", as: "owner" });
Store.belongsTo(Admin, { foreignKey: "created_by", as: "creator" });

// Admin <-> Store (admin's assigned store)
Store.hasMany(Admin, { foreignKey: "store_id", as: "storeAdmins" });
Admin.belongsTo(Store, { foreignKey: "store_id", as: "store" });

// Outlet <-> Store
Store.hasMany(Outlet, { foreignKey: "store_id" });
Outlet.belongsTo(Store, { foreignKey: "store_id" });

// Outlet manager and creator (both FK to admins)
Admin.hasMany(Outlet, { foreignKey: "manager_id", as: "managedOutlets" });
Outlet.belongsTo(Admin, { foreignKey: "manager_id", as: "manager" });
Outlet.belongsTo(Admin, { foreignKey: "created_by", as: "creator" });

// Menu self-reference (submenus)
Menu.hasMany(Menu, { foreignKey: "parent_id", as: "subMenus" });
Menu.belongsTo(Menu, { foreignKey: "parent_id", as: "parent" });

// Permission <-> Menu, Role, Store
Menu.hasMany(Permission, { foreignKey: "menu_id" });
Permission.belongsTo(Menu, { foreignKey: "menu_id" });
Role.hasMany(Permission, { foreignKey: "role_id" });
Permission.belongsTo(Role, { foreignKey: "role_id" });
Store.hasMany(Permission, { foreignKey: "store_id" });
Permission.belongsTo(Store, { foreignKey: "store_id" });

// State <-> City
State.hasMany(City, { foreignKey: "state_id" });
City.belongsTo(State, { foreignKey: "state_id" });

// Address <-> User, City, State
User.hasMany(Address, { foreignKey: "user_id" });
Address.belongsTo(User, { foreignKey: "user_id" });
City.hasMany(Address, { foreignKey: "city_id" });
Address.belongsTo(City, { foreignKey: "city_id" });
State.hasMany(Address, { foreignKey: "state_id" });
Address.belongsTo(State, { foreignKey: "state_id" });

// Category self-reference (subcategories)
Category.hasMany(Category, { foreignKey: "parent_id", as: "children" });
Category.belongsTo(Category, { foreignKey: "parent_id", as: "parent" });

// Category <-> Store & Outlet
Store.hasMany(Category, { foreignKey: "store_id" });
Category.belongsTo(Store, { foreignKey: "store_id" });
Outlet.hasMany(Category, { foreignKey: "outlet_id" });
Category.belongsTo(Outlet, { foreignKey: "outlet_id" });

// Product <-> Category
Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

// Cart <-> User & Product (flat, one row per line item)
User.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });
Product.hasMany(Cart, { foreignKey: "product_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });

// Wishlist <-> User & Product
User.hasMany(Wishlist, { foreignKey: "user_id" });
Wishlist.belongsTo(User, { foreignKey: "user_id" });
Product.hasMany(Wishlist, { foreignKey: "product_id" });
Wishlist.belongsTo(Product, { foreignKey: "product_id" });

// Order <-> User
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

// Order <-> Store & Outlet
Store.hasMany(Order, { foreignKey: "store_id" });
Order.belongsTo(Store, { foreignKey: "store_id" });
Outlet.hasMany(Order, { foreignKey: "outlet_id" });
Order.belongsTo(Outlet, { foreignKey: "outlet_id" });

// OrderItem <-> Order & Product
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });
Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

// Payment <-> Order (one-to-one)
Order.hasOne(Payment, { foreignKey: "order_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

// Tax <-> Store
Store.hasMany(Tax, { foreignKey: "store_id" });
Tax.belongsTo(Store, { foreignKey: "store_id" });

// Review <-> User & Product
User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });
Product.hasMany(Review, { foreignKey: "product_id" });
Review.belongsTo(Product, { foreignKey: "product_id" });

export {
  User, Admin, Role, Store, Outlet, Menu, Permission,
  State, City, Address,
  Category, Product, Cart, Order, OrderItem, Payment, Review, Wishlist, Tax,
};
