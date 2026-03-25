import User from "./user.model";
import Admin from "./admin.model";
import Role from "./role.model";
import Store from "./store.model";
import Outlet from "./outlet.model";
import Menu from "./menu.model";
import Permission from "./permission.model";
import Category from "./category.model";
import Product from "./product.model";
import Cart from "./cart.model";
import CartItem from "./cartItem.model";
import Order from "./order.model";
import OrderItem from "./orderItem.model";
import Payment from "./payment.model";
import Review from "./review.model";

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

// Category self-reference (subcategories)
Category.hasMany(Category, { foreignKey: "parentId", as: "children" });
Category.belongsTo(Category, { foreignKey: "parentId", as: "parent" });

// Product <-> Category
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

// Cart <-> User (one-to-one)
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

// CartItem <-> Cart & Product
Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// Order <-> User
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// OrderItem <-> Order & Product
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

// Payment <-> Order (one-to-one)
Order.hasOne(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });

// Review <-> User & Product
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });
Product.hasMany(Review, { foreignKey: "productId" });
Review.belongsTo(Product, { foreignKey: "productId" });

export { User, Admin, Role, Store, Outlet, Menu, Permission, Category, Product, Cart, CartItem, Order, OrderItem, Payment, Review };
