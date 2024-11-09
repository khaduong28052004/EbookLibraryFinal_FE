console.log("Inserting sample data into the e-book library database...\n");

// Insert sample roles
console.log("Inserting roles:");
console.log(`
INSERT INTO ROLES (id, name, description) VALUES
(1, 'ADMIN', 'Administrator'),
(2, 'SELLER', 'Book Seller'),
(3, 'USER', 'Regular User');
`);

// Insert sample accounts
console.log("Inserting accounts:");
console.log(`
INSERT INTO ACCOUNTS (id, username, email, password, role_id) VALUES
(1, 'admin', 'admin@example.com', 'hashed_password', 1),
(2, 'seller1', 'seller1@example.com', 'hashed_password', 2),
(3, 'user1', 'user1@example.com', 'hashed_password', 3);
`);

// Insert sample categories
console.log("Inserting categories:");
console.log(`
INSERT INTO CATEGORIES (id, name, idParent) VALUES
(1, 'Fiction', NULL),
(2, 'Non-Fiction', NULL),
(3, 'Science Fiction', 1),
(4, 'Mystery', 1),
(5, 'Biography', 2);
`);

// Insert sample products (books)
console.log("Inserting products (books):");
console.log(`
INSERT INTO PRODUCTS (id, name, price, quantity, account_id, category_id) VALUES
(1, 'The Martian', 14.99, 100, 2, 3),
(2, 'Sherlock Holmes', 12.99, 75, 2, 4),
(3, 'Steve Jobs Biography', 19.99, 50, 2, 5);
`);

// Insert sample bills
console.log("Inserting bills:");
console.log(`
INSERT INTO BILLS (id, account_id, address_id, totalPrice, orderstatus_id, paymentmethod_id) VALUES
(1, 3, 1, 27.98, 1, 1),
(2, 3, 1, 19.99, 2, 2);
`);

// Insert sample bill details
console.log("Inserting bill details:");
console.log(`
INSERT INTO BILLDETAILS (id, bill_id, product_id, quantity, price) VALUES
(1, 1, 1, 1, 14.99),
(2, 1, 2, 1, 12.99),
(3, 2, 3, 1, 19.99);
`);

console.log("\nSample data insertion complete.");